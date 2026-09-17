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
  // -------------------------
  // Two Sum
  // -------------------------

  const twoSum = await prisma.problem.upsert({
    where: {
      title: "Two Sum",
    },
    update: {
      description:
        "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
      difficulty: "Easy",
      functionName: "twoSum",
    },
    create: {
      title: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
      difficulty: "Easy",
      functionName: "twoSum",
    },
  });

  await prisma.testCase.deleteMany({
    where: {
      problemId: twoSum.id,
    },
  });

  await prisma.testCase.createMany({
    data: [
      {
        input: JSON.stringify({
          nums: [2, 7, 11, 15],
          target: 9,
        }),
        output: JSON.stringify([0, 1]),
        problemId: twoSum.id,
      },
      {
        input: JSON.stringify({
          nums: [3, 2, 4],
          target: 6,
        }),
        output: JSON.stringify([1, 2]),
        problemId: twoSum.id,
      },
      {
        input: JSON.stringify({
          nums: [3, 3],
          target: 6,
        }),
        output: JSON.stringify([0, 1]),
        problemId: twoSum.id,
      },
    ],
  });

  // -------------------------
  // Reverse String
  // -------------------------

  const reverseString = await prisma.problem.upsert({
    where: {
      title: "Reverse String",
    },
    update: {
      description:
        "Write a function that reverses a string and returns the reversed string.",
      difficulty: "Easy",
      functionName: "reverseString",
    },
    create: {
      title: "Reverse String",
      description:
        "Write a function that reverses a string and returns the reversed string.",
      difficulty: "Easy",
      functionName: "reverseString",
    },
  });

  await prisma.testCase.deleteMany({
    where: {
      problemId: reverseString.id,
    },
  });

  await prisma.testCase.createMany({
    data: [
      {
        input: JSON.stringify("hello"),
        output: JSON.stringify("olleh"),
        problemId: reverseString.id,
      },
      {
        input: JSON.stringify("world"),
        output: JSON.stringify("dlrow"),
        problemId: reverseString.id,
      },
      {
        input: JSON.stringify("codeforce"),
        output: JSON.stringify("ecrofedoc"),
        problemId: reverseString.id,
      },
    ],
  });

  // -------------------------
  // Palindrome Number
  // -------------------------

  const palindrome = await prisma.problem.upsert({
    where: {
      title: "Palindrome Number",
    },
    update: {
      description:
        "Given an integer x, return true if x is a palindrome, and false otherwise.",
      difficulty: "Easy",
      functionName: "isPalindrome",
    },
    create: {
      title: "Palindrome Number",
      description:
        "Given an integer x, return true if x is a palindrome, and false otherwise.",
      difficulty: "Easy",
      functionName: "isPalindrome",
    },
  });

  await prisma.testCase.deleteMany({
    where: {
      problemId: palindrome.id,
    },
  });

  await prisma.testCase.createMany({
    data: [
      {
        input: JSON.stringify(121),
        output: JSON.stringify(true),
        problemId: palindrome.id,
      },
      {
        input: JSON.stringify(-121),
        output: JSON.stringify(false),
        problemId: palindrome.id,
      },
      {
        input: JSON.stringify(10),
        output: JSON.stringify(false),
        problemId: palindrome.id,
      },
    ],
  });

  console.log("Problems and test cases seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });