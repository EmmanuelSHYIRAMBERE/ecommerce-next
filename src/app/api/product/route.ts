import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { name, description, price, quantity, picture } = data;

  const requiredFields = [name, price, quantity];

  try {
    for (const field of requiredFields) {
      console.log("Received required field:==", field);
      if (!field) {
        return NextResponse.json(
          {
            message: `There are missing required fields [name, price, quantity]. Add  or check for typos`,
          },
          { status: 400 },
        );
      }
    }

    const productCreated = await prisma.product.create({
      data: {
        name: name,
        description: description || "",
        price: parseInt(price),
        quantity: parseInt(quantity),
        picture: picture || "",
      },
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        data: productCreated,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Received error", error);

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

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany();

    if (!allProducts || allProducts.length === 0) {
      return NextResponse.json(
        {
          message: "No products found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "All products retrieved successfully",
        data: allProducts,
      },
      { status: 200 },
    );
  } catch (error) {
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
