const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
import { getAnalysis } from "./gemini"

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

/**
 * Creates client for Telegram API
 * @param {*} sessionString Telegram API session
 * @returns Telegram API client for specified session
 */
function createClient(sessionString) {
    return new TelegramClient(new StringSession(sessionString), apiId, apiHash, {});
}


/**
 * Sends OTP to user's Telegram account tied to phone number
 * @param {*} phoneNum User's phone number
 * @returns Telegram API session & phone code hash
 */
export async function getCode(phoneNum) {
    const client = createClient("");

    await client.connect();

    try {
        const result = await client.invoke(
            new Api.auth.SendCode({
                phoneNumber: phoneNum,
                apiId: apiId,
                apiHash: apiHash,
                settings: new Api.CodeSettings({}),
            })
        );
        
        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString,
                phoneCodeHash: result.phoneCodeHash
            }
        };
    } catch (error) {
        return { code: error.code, content: { error: error.message } };
    }
}

/**
 * Check if user has 2FA enabled on their Telegram account
 * @param {*} session Telegram API session
 * @returns Telegram API session & 2FA status
 */
export async function checkIfHave2FA(session) {
    const client = createClient(session);
    
    await client.connect();

    try {
        const result = await client.invoke(new Api.account.GetPassword({}));

        if (result) {
            return { 
                code: 200, 
                content: {
                    session: sessionString,
                    haveTwoFA: true
                }
            };
        }

    } catch (error) {
        if (error.errorMessage == "AUTH_KEY_UNREGISTERED") {
            return { 
                code: 200, 
                content: {
                    session: sessionString,
                    haveTwoFA: false
                }
            };
        }
        return { code: error.code, content: { error: error.errorMessage } };
    }
}


/**
 * Sign in to user's Telegram account
 * @param {*} session Telegram API session
 * @param {*} phoneNum User's phone number
 * @param {*} phoneCodeHash Phone Code Hash returned by getCode API
 * @param {*} code OTP sent to User's Telegram account
 * @returns Telegram API session
 */
export async function signIn(session, phoneNum, phoneCodeHash, code, userPassword) {
    const client = createClient(session);

    await client.connect();

    try {
        await client.invoke(
            new Api.auth.SignIn({
                phoneNumber: phoneNum,
                phoneCodeHash: phoneCodeHash,
                phoneCode: code,
            })
        );

        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString
            }
        };
    } catch (error) {
        // if (error.errorMessage === "SESSION_PASSWORD_NEEDED") {
        //     const pwInfo = await client.invoke(new Api.account.GetPassword());
        //     console.log(pwInfo);
    
        //     await client.invoke(new Api.auth.CheckPassword({ password: userPassword }));

        //   } else {
        //     throw error;
        // }
        return { code: error.code, content: { error: error.errorMessage } };
    }
}

export async function signInWith2FA(session, phoneNum, phoneCodeHash, code, userPassword) {
    const client = createClient(session);

    await client.connect();

    try {
        const result = await client.start({
            phoneNumber: async () => phoneNum,
            password: async () => userPassword,
            phoneCode: async () => code,
            onError: (err) => console.log(err),
        });

        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString
            }
        };
    } catch (error) {
        return { code: error.code, content: { error: error.errorMessage } };
    }
}

/**
 * Log out of Telegram API session
 * @param {*} session Telegram API session
 * @returns Success/Error message
 */
export async function logout(session) {
    const client = createClient(session);
    await client.connect();

    try {
        await client.invoke(new Api.auth.LogOut({}));
        return { code: 200, content: { message: "Successfully logged out" } };
    } catch (error) {
        return { code: error.code, content: { error: error.errorMessage } };
    }
}


/**
 * Get information on any Telegram user
 * @param {*} client Telegram API client tied to a session
 * @param {*} userId Telegram user ID
 * @returns Information on Telegram user (username, first name, last name, etc)
 */
async function getUser(client, userId){
    try {
        const result = await client.invoke(
            new Api.users.GetFullUser({
                id: userId,
            })
        );
        return result;
    } catch (error){
        return {};
    }
}


/**
 * Get information on any Telegram chat 
 * @param {*} client Telegram API client tied to a session
 * @param {*} chatId Telegram chat ID
 * @returns Information on Telegram chat (name, members, etc)
 */
async function getChat(client, chatId){
    try {
        const result = await client.invoke(
            new Api.messages.GetChats({
                id: [chatId],
            })
        );
        return result;
    } catch (error){
        return {};
    }
}


/**
 * Get 10 most recent chats from Telegram user account. Chats include groups and users, excluding channels and supergroups
 * @param {*} client Telegram API client tied to a session
 * @returns 10 most recent chats with their type, id, information (depending on the type of chats)
 */
async function getChatIds(client){
    var chatIdList = [];

    try {
        const currUser = await getUser(client, "me");
        const currUserId = currUser.fullUser.id.value;

        const result = await client.invoke(
            new Api.messages.GetDialogs({
                offsetDate: 0,
                offsetId: 0,
                offsetPeer: "me",
                limit: 30,
                hash: BigInt("-4156887774564"),
                excludePinned: false,
                folderId: 0,
            })
        );

        var count = 0;

        for (const chat of result.dialogs) {
            if (count == 10) {
                break;
            }

            if (chat.peer.className === "PeerUser") {
                if (chat.peer.userId.value !== currUserId && chat.peer.userId.value !== BigInt("777000").valueOf()) {
                    const user = await getUser(client, chat.peer.userId);
                    const { firstName, lastName, username } = user.users[0]
                
                    const chatInfo = {
                        type: "user",
                        id: chat.peer.userId,
                        info: {
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            topMessageId: chat.topMessage,
                        }
                    }
                    chatIdList.push(chatInfo);
                    count++;
                }
            } else if (chat.peer.className === "PeerChat") {
                const group = await getChat(client, chat.peer.chatId);
                const chatInfo = {
                    type: "chat",
                    id: chat.peer.chatId,
                    info: {
                        title: group.chats[0].title,
                        topMessageId: chat.topMessage,
                    }
                }
                chatIdList.push(chatInfo);
                count++;
            }
        }
        return chatIdList;
    } catch (error) {
        return [];
    }
}


/**
 * Connect to client to get 10 most recent chats from user's account
 * @param {*} session Telegram API session
 * @returns session & 10 most recent chats
 */
export async function getChatInfos(session) {

    const client = createClient(session);
    await client.connect();

    try {
        const chatInfo = await getChatIds(client);
        if (chatInfo.length ==0) {
            throw new Error("Error with Telegram");
        }
        
        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString,
                chatInfo: chatInfo,
            }
        };
    } catch (error) {
        return { 
            code: error.code || 500, 
            content: { error: error.message || "Unknown error" }
        };
    }
}


/**
 * Get all members of a chat
 * @param {*} client Telegram API client tied to a session
 * @param {*} chatId Chat ID to be checked
 * @returns Id and username of all members
 */
async function getChatMembers(client, chatId) {
    const users = new Object();

    try {
        const result = await client.invoke(
            new Api.messages.GetHistory({
                peer: chatId,
                offsetId: 0,
                offsetDate: 0,
                addOffset: 0,
                limit: 1,
                maxId: 0,
                minId: 0,
                hash: BigInt("-4156887774564"),
            })
        );
        
        for (const user of result.users) {
            const {id, username} = user;
            users[id] = username;
        }
        return users;
    } catch (error) {
        return []
    }
}


/**
 * Get latest messages from specified chat
 * @param {*} client Telegram API client tied to a session
 * @param {*} chatId Chat ID 
 * @param {*} numOfMessages Number of Telegram chat messages to be retrieved for analysis
 * @returns List of latest messages and its respective information (id, data, content, etc)
 */
async function getMessages(client, chatId, numOfMessages) {
    try {
        const result = new Array();

        const users = await getChatMembers(client, chatId);

        for await (const messageJson of client.iterMessages(chatId, { limit: numOfMessages })) {
            var {id, fromId, peerId, fwdFrom, replyTo, date, message, pinned, reactions} = messageJson;

            if (fromId != null) {
                fromId = users[String(fromId.userId.value)];
            }

            if (peerId != null) {
                peerId = users[String(peerId.userId.value)];
            }

            result.push({
                id: id,
                fromId: fromId,
                peerId: peerId,
                fwdFrom: fwdFrom,
                replyTo: replyTo,
                date: date,
                message: message,
                pinned: pinned,
                reactions: reactions,
            })
        } 

        return result;
    } catch (error) {
        return [];
    }
}


/**
 * Get latest messages from a specified chat and analyse them
 * @param {*} session Telegram API session
 * @param {*} chatId Chat ID
 * @param {*} numOfMessages Number of Telegram chat messages to be retrieved for analysis
 * @returns Analysis of chat messages
 */
export async function getBulkMessages(session, chatId, numOfMessages) {
    const client = createClient(session);
    await client.connect();
    client.floodSleepThreshold = 180;

    try {
        
        const history = await getMessages(client, chatId, numOfMessages);
        
        if (history.length == 0) {
            throw new Error("Error with Telegram");
        }

        const analysis = await getAnalysis(history);

        if (Object.keys(analysis).length === 0) {
            throw new Error("Error with Gemini");
        }
        
        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString,
                analysis: analysis,
            }
        };
    } catch (error) {
        return { 
            code: error.code || 500, 
            content: { error: error.message || "Unknown error" }
        };
    }
}