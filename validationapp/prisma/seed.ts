import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const passwordHash = await bcrypt.hash("asdf_123", 12);

  await prisma.user.upsert({
    where: { email: "smanukyan2005@gmail.com" },
    update: {},
    create: {
      email: "smanukyan2005@gmail.com",
      name: "Admin",
      passwordHash,
    },
  });

  const adminId = await prisma.user
    .findUnique({ where: { email: "smanukyan2005@gmail.com" } })
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
