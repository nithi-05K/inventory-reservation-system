import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // Create Products
  const iphone = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Apple smartphone"
    }
  });

  const laptop = await prisma.product.create({
    data: {
      name: "MacBook Air",
      description: "Apple laptop"
    }
  });

  // Create Warehouses
  const chennaiWarehouse = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
      location: "Chennai"
    }
  });

  const bangaloreWarehouse = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
      location: "Bangalore"
    }
  });

  // Create Inventory
  await prisma.inventory.createMany({
    data: [
      {
        productId: iphone.id,
        warehouseId: chennaiWarehouse.id,
        totalUnits: 10,
        reservedUnits: 0
      },
      {
        productId: iphone.id,
        warehouseId: bangaloreWarehouse.id,
        totalUnits: 5,
        reservedUnits: 0
      },
      {
        productId: laptop.id,
        warehouseId: chennaiWarehouse.id,
        totalUnits: 8,
        reservedUnits: 0
      }
    ]
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });