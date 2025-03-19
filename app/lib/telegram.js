const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
import { getAnalysis } from "./gemini"

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

function createClient(sessionString) {
    return new TelegramClient(new StringSession(sessionString), apiId, apiHash, {});
}

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

export async function signIn(session, phoneNum, phoneCodeHash, code) {
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
        return { code: error.code, content: { error: error.errorMessage } };
    }
}

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

export async function getChatInfos(session) {

    const client = createClient(session);
    await client.connect();

    try {
        const chatInfo = await getChatIds(client);
        
        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString,
                chatInfo: chatInfo,
            }
        };
    } catch (error) {
        return { code: error.code, content: { error: error.errorMessage } };
    }
}

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

export async function getBulkMessages(session, chatId) {
    const client = createClient(session);
    await client.connect();
    client.floodSleepThreshold = 180;

    try {
        const result = new Array();

        const users = await getChatMembers(client, chatId);

        for await (const messageJson of client.iterMessages(chatId, { limit: 3000 })) {
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

        const analysis = await getAnalysis(result);
        
        const sessionString = client.session.save();

        return { 
            code: 200, 
            content: {
                session: sessionString,
                analysis: analysis,
            }
        };
    } catch (error) {
        return { code: error.code, content: { error: error.errorMessage } };
    }
}