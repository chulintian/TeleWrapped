import { signInWith2FA } from "../../../lib/telegram"

export async function POST(request) {
    const body = await request.json();
    const { sessionObj, phoneNumber, userPassword, code} = body;
    const result = await signInWith2FA (sessionObj, phoneNumber, userPassword, code);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
