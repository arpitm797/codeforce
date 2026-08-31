import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

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
  // Remove existing test cases
  await prisma.testCase.deleteMany();

  // Find existing problems
  const problems = await prisma.problem.findMany();

  const twoSum = problems.find(
    (problem) => problem.title === "Two Sum"
  );

  if (twoSum) {
    await prisma.testCase.createMany({
      data: [
        {
          input: "2 7",
          expectedOutput: "9",
          problemId: twoSum.id,
        },
        {
          input: "10 20",
          expectedOutput: "30",
          problemId: twoSum.id,
        },
      ],
    });
  }

  console.log("Test cases seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });