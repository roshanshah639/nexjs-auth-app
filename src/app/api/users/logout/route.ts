import { NextResponse } from "next/server";

export async function GET() {
  try {
    // create a response
    const response = NextResponse.json({
      message: "Logged Out Successfully",
      success: true,
    });

    // set the cookie
    await response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // return the response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
