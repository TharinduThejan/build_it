import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_URL ?? "http://localhost:5000";

async function buildResponse(res: Response) {
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
        const text = await res.text();
        return new NextResponse(text, {
            status: res.status,
            headers: { "content-type": contentType || "text/plain" },
        });
    }

    try {
        const payload = await res.json();
        return NextResponse.json(payload, { status: res.status });
    } catch {
        const text = await res.text();
        return new NextResponse(text, {
            status: res.status,
            headers: { "content-type": "text/plain" },
        });
    }
}

export async function GET() {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    return buildResponse(res);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const auth = req.headers.get("authorization") ?? "";

    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(auth ? { Authorization: auth } : {}),
        },
        body: JSON.stringify(body),
    });

    return buildResponse(res);
}
