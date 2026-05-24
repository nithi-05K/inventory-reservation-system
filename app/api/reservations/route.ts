import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const {
      productId,
      warehouseId,
      quantity
    } = body;

    const result = await prisma.$transaction(async (tx) => {

      // Find inventory
      const inventory = await tx.inventory.findFirst({
        where: {
          productId,
          warehouseId
        }
      });

      if (!inventory) {

        return {
          error: "Inventory not found",
          status: 404
        };
      }

      const availableStock =
        inventory.totalUnits -
        inventory.reservedUnits;

      // Prevent overselling
      if (availableStock < quantity) {

        return {
          error: "Not enough stock",
          status: 409
        };
      }

      // Reserve stock
      await tx.inventory.update({
        where: {
          id: inventory.id
        },

        data: {
          reservedUnits: {
            increment: quantity
          }
        }
      });

      // Create reservation
      const reservation =
        await tx.reservation.create({

          data: {
            productId,
            warehouseId,
            quantity,

            status: "PENDING",

            expiresAt: new Date(
              Date.now() + 15 * 60 * 1000
            )
          }
        });

      return {
        reservation,
        status: 200
      };
    });

    return NextResponse.json(result, {
      status: result.status
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}