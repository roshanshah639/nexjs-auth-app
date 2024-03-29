import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Database Connection
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    // if user does not exist
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist. Please Signup" },
        { status: 400 }
      );
    }
    console.log("User Exists");

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    // if password is incorrect
    if (!validPassword) {
      return NextResponse.json(
        { error: "Incorrect Password. Please try again" },
        { status: 400 }
      );
    }

    // create a token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // create a response
    const response = NextResponse.json({
      message: "Logged In Successfully.",
      success: true,
    });

    // set the cookie
    await response.cookies.set("token", token, { httpOnly: true });

    // return the response
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
