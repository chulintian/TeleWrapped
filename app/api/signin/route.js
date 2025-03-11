import { signIn } from "../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj, phoneNum, phoneCodeHash, code } = body;
    const result = await signIn(sessionObj, phoneNum, phoneCodeHash, code);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
