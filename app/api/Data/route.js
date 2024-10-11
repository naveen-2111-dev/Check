import emailQuery from "@/app/helper/query";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { mail, password } = body;

  if (!mail || !password) {
    return NextResponse.json(
      { message: "user details - null" },
      { status: 400 }
    );
  }

  try {
    const User = await emailQuery(mail, password);

    if (User && User.length > 0) {
      return NextResponse.json(
        { message: "user found", data: User },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
