import { signInWith2FA } from "../../../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj, phoneNum, phoneCodeHash, code, userPassword } = body;
    const result = await signInWith2FA(sessionObj, phoneNum, phoneCodeHash, code, userPassword);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
