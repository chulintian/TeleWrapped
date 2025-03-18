import { getBulkMessages } from "../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj, chatId, topMessageId } = body;
    const result = await getBulkMessages(sessionObj, chatId, topMessageId);

    return new Response(JSON.stringify(result), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
