const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

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