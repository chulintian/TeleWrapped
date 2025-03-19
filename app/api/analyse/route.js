import { getBulkMessages } from "../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj, chatId } = body;
    const result = await getBulkMessages(sessionObj, chatId);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
