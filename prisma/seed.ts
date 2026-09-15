import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const problem = await prisma.problem.upsert({
    where: {
      title: "Two Sum",
    },

    update: {
      testCases: {
        deleteMany: {},
        create: [
          {
            input: "2 7",
            output: "9",
          },
          {
            input: "10 20",
            output: "30",
          },
          {
            input: "5 8",
            output: "13",
          },
        ],
      },
    },

    create: {
      title: "Two Sum",
      description: "Given two integers, return their sum.",
      difficulty: "Easy",

      testCases: {
        create: [
          {
            input: "2 7",
            output: "9",
          },
          {
            input: "10 20",
            output: "30",
          },
          {
            input: "5 8",
            output: "13",
          },
        ],
      },
    },
  });

  console.log("Problem seeded successfully:", problem);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });