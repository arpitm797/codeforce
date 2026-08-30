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
  await prisma.problem.createMany({
    data: [
      {
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "Easy",
      },
      {
        title: "Binary Search",
        description:
          "Given a sorted array of integers, find the position of a target value using binary search.",
        difficulty: "Easy",
      },
      {
        title: "Longest Substring",
        description:
          "Given a string, find the length of the longest substring without repeating characters.",
        difficulty: "Medium",
      },
      {
        title: "Number of Islands",
        description:
          "Given a grid of land and water, count the number of islands.",
        difficulty: "Medium",
      },
      {
        title: "Merge K Sorted Lists",
        description:
          "Merge k sorted linked lists into one sorted linked list.",
        difficulty: "Hard",
      },
    ],
  });

  console.log("Problems seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  