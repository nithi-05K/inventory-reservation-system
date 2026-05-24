import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await context.params;

    const reservation =
      await prisma.reservation.findUnique({

        where: {
          id
        }
      });

    if (!reservation) {

      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    await prisma.reservation.update({

      where: {
        id
      },

      data: {
        status: "RELEASED"
      }
    });

    return NextResponse.json({
      message: "Reservation released"
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}