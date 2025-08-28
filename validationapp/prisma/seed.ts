import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const passwordHash = await bcrypt.hash("asdf_123", 12);

  await prisma.user.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      email: "admin@test.com",
      name: "Admin",
      passwordHash,
    },
  });

  const adminId = await prisma.user
    .findUnique({ where: { email: "admin@test.com" } })
    .then((u) => u?.id);

  if (adminId) {
    await prisma.task.create({
      data: {
        userId: adminId,
        description: "Test task",
        isCompleted: false,
      },
    });
  }
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
