import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const inventory =
      await prisma.inventory.findMany({

        include: {
          product: true,
          warehouse: true,
        },
      });

    return NextResponse.json(
      inventory
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}