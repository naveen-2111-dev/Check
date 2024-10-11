import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function emailQuery(email, pass) {
  try {
    const AvailUser = await prisma.userCred.findMany({
      where: {
        mail: email,
        password: pass,
      },
    });

    return AvailUser;
  } catch (err) {
    return null;
  }
}

emailQuery()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    await prisma.$disconnect();
    process.exit(1);
  });
