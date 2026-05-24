import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!productFound) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Product found successfully",
        data: productFound,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const data = await req.json();

  const { name, description, price, quantity, picture } = data;

  try {
    if (!name && !description && !price && !quantity && !picture) {
      return NextResponse.json(
        {
          message: "At least one field is required to update the product",
        },
        { status: 400 },
      );
    }

    const productFound = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!productFound) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productFound.id,
      },
      data: {
        name: name || productFound.name,
        description: description || productFound.description,
        price: parseInt(price) || productFound.price,
        quantity: parseInt(quantity) || productFound.quantity,
        picture: picture || productFound.picture,
      },
    });

    return NextResponse.json(
      {
        message: "Product updated successfully",
        data: updatedProduct,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  try {
    const productFound = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!productFound) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 },
      );
    }

    const productDeleted = await prisma.product.delete({
      where: {
        id: productFound.id,
      },
    });

    return NextResponse.json(
      {
        message: "Product deleted successfully",
        data: productDeleted,
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
