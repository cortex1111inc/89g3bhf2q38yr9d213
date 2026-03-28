import "dotenv/config";

import { NextRequest, NextResponse } from "next/server";

// Recipients - Web3Forms forwards to the email registered with the access key.
// To CC additional addresses, list them here.
const CC_RECIPIENTS = ["hello@vanspire.in", "adithyan.n.dileep@gmail.com"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, message, website, extraData } = body;

    // Basic server-side validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    // Capture metadata from request
    const forwarded = req.headers.get("x-forwarded-for");
    const ipAddress =
      forwarded?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const referrer = req.headers.get("referer") || "Direct/None";
    const origin = req.headers.get("origin") || "Unknown";
    const secChUa = req.headers.get("sec-ch-ua") || "Unknown";
    const secChUaPlatform = req.headers.get("sec-ch-ua-platform") || "Unknown";
    const secChUaMobile = req.headers.get("sec-ch-ua-mobile") || "Unknown";
    const acceptLanguage = req.headers.get("accept-language") || "Unknown";

    // Security info
    const isSourcedFromBot = !!website;
    const botScore = extraData?.botScore ?? 0;
    const timeOnPageText = extraData?.interaction?.timeOnPage 
      ? `${(extraData.interaction.timeOnPage / 1000).toFixed(1)}s` 
      : "Unknown";

    // Forward via Web3Forms (free - no SMTP required)
    // Docs: https://web3forms.com
    const formPayload = {
      access_key: process.env.WEB3FORMS_KEY,
      subject: `New Enquiry from ${name} - ${company}${isSourcedFromBot || botScore >= 2 ? ' [POTENTIAL SPAM]' : ''}`,
      from_name: "Vanspire Contact Form",
      replyto: "vanspire.innovations@gmail.com",
      cc: CC_RECIPIENTS.join(","),
      // Fields shown in the email body
      "Full Name": name,
      Email: email,
      "Company / Organisation": company,
      Message: message,
      "Submitted At": `${timestamp} IST`,
      Source: "vanspire.in/contact",
      "--- Frontend Security Analysis ---": "-----------------------",
      "Bot Score": String(botScore),
      "Time on Page": timeOnPageText,
      "Mouse Moved": extraData?.interaction?.mouseMoved ? "Yes" : "No",
      "Key Pressed": extraData?.interaction?.keyPressed ? "Yes" : "No",
      "Clicks": String(extraData?.interaction?.clicks ?? 0),
      "Honeypot Triggered": isSourcedFromBot ? "Yes" : "No",
      "Client Environment": `${extraData?.screen?.width || '?'}x${extraData?.screen?.height || '?'} | TZ: ${extraData?.timezone || '?'} | Cores: ${extraData?.environment?.hardwareConcurrency || '?'} | Mem: ${extraData?.environment?.deviceMemory || '?'}`,
      "--- Server-side Meta Information ---": "-----------------------",
      "IP Address": ipAddress,
      "User-Agent": userAgent,
      "Referrer": referrer,
      "Origin": origin,
      "Platform": secChUaPlatform.replace(/"/g, ''),
      "Mobile": secChUaMobile === "?1" ? "Yes" : (secChUaMobile === "Unknown" ? "Unknown" : "No"),
      "Browser Info": secChUa,
      "Language": acceptLanguage,
    };

    if (!process.env.WEB3FORMS_KEY) {
      return NextResponse.json(
        { error: "Server misconfiguration: Missing access key" },
        { status: 500 },
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Vercel Serverless)",
        Origin: "https://vanspire.in",
        Referer: "https://vanspire.in/contact",
      },
      body: JSON.stringify(formPayload),
    });

    const text = await response.text();

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from Web3Forms", raw: text },
        { status: 500 },
      );
    }

    if (!response.ok || result.success === false) {
      console.error("[Contact API] Web3Forms error:", result);
      return NextResponse.json(
        { error: result.message || "Failed to send message." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
