import { getChatInfos } from "../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj } = body;
    const result = await getChatInfos(sessionObj);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
