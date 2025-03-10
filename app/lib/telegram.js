import { message } from "telegram/client";

const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const apiId = Number(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;

const session = new StringSession("");
const client = new TelegramClient(session, apiId, apiHash, {});

export async function getCode(phoneNum) {
    await client.connect();

    try {
        await client.invoke(
            new Api.auth.SendCode({
                phoneNumber: phoneNum,
                apiId: apiId,
                apiHash: apiHash,
                settings: new Api.CodeSettings({}),
            })
        );
        client.session.save();
        return { code: 200, message: "Success" };
        
    } catch (error) {
        return { code: error.code, message: error.message };
    }
}