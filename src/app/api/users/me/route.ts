import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Database Connection
connectDB();

export async function POST(request: NextRequest) {
  // Extract data from token
  const userId = await getDataFromToken(request);

  // find user based on id
  const user = await User.findById({ _id: userId }).select("-password");

  // Check if there is no user
  return NextResponse.json({
    message: "User Found",
    data: user,
  });
}
