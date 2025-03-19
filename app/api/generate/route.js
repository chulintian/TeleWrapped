import { generateSetMenus } from "../../lib/menu"

export async function GET() {
    const result = generateSetMenus();

    return new Response(JSON.stringify(result.content), {
        status: result.code,
        headers: { 'Content-Type': 'application/json' }
    });
}
