import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Database Connection
connectDB();

export async function POST(request: NextRequest) {
  try {
    // Get the token from request
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    // find user by token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // if user does not exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Token Data. Please Signup Again" },
        { status: 400 }
      );
    }
    console.log(user);

    // Update the user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // save the user
    await user.save();

    // return the response
    return NextResponse.json({
      message: "Email Verified Successfully.",
      success: true,
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
