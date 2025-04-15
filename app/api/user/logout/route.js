import { logout } from "../../../lib/telegram"

export async function POST(request) {
    let sessionObj;
    try {
        const body = await request.json();
        sessionObj = body.sessionObj;
    } catch (e) {
        const raw = await request.text();
        sessionObj = raw;
    }

    const result = await logout(sessionObj);

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
