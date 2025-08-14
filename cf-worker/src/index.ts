export interface Env {
    DATA_BS_PUSH_KEY: string;
}

const ALLOW_ORIGIN = "https://opendatabs.github.io"; // your site

function cors(origin = ALLOW_ORIGIN) {
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        // CORS preflight
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: cors() });
        }
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405, headers: cors() });
        }

        const body = await request.text(); // pass-through JSON
        const upstreamUrl =
            `https://data.bs.ch/api/push/1.0/opendataquiz/echtzeit/push/?pushkey=${env.DATA_BS_PUSH_KEY}`;

        const upstream = await fetch(upstreamUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        });

        const text = await upstream.text();
        return new Response(text, {
            status: upstream.status,
            headers: {
                "Content-Type": "application/json",
                ...cors(),
            },
        });
    },
} satisfies ExportedHandler<Env>;
