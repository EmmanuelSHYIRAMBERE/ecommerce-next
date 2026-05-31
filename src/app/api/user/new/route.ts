import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import bcrypt from "bcrypt";
import { UserDataValidation } from "@/validations/user";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { name, email, image, password } = data;

  try {
    const parsedData = UserDataValidation.safeParse(data);

    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (issue) => issue.message,
      );

      return NextResponse.json(
        {
          message: errorMessages[0] || "Invalid input data",
          error: errorMessages[0] || "Invalid input data",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User with this email already exists",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10,
    );

    const newUser = await prisma.user.create({
      data: {
        name: name || "",
        email,
        image: image || "",
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(`Error of user: ${error}`);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 },
      );
    }
  }
}
