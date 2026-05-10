import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/discord`;
  
  if (!clientId) {
    return NextResponse.json({ error: "DISCORD_CLIENT_ID missing" }, { status: 500 });
  }

  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("scope", "identify email");

  // Optional: add a state parameter to prevent CSRF, but keeping it simple for now.

  return NextResponse.redirect(url.toString());
}
