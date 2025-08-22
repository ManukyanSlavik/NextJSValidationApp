import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const passwordHash = await bcrypt.hash("SuperCoolAdminPassword_123", 12);

  await prisma.user.upsert({
    where: { email: "admin@pizdatiy.com" },
    update: {},
    create: {
      email: "admin@pizdatiy.com",
      name: "Admin",
      passwordHash,
    },
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
