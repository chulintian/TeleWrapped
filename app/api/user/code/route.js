import { getCode } from "../../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { phoneNum } = body;
    const result = await getCode(phoneNum);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
