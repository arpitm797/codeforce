import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const submitSchema = z.object({
  problemId: z.number(),
  language: z.enum(["javascript", "python", "cpp"]),
  code: z.string().min(1, "Code cannot be empty"),
});

const languageIds = {
  javascript: 63,
  python: 71,
  cpp: 54,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = submitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid submission",
        },
        {
          status: 400,
        }
      );
    }

    const { problemId, language, code } = result.data;

    // Get problem and test cases
    const problem = await prisma.problem.findUnique({
      where: {
        id: problemId,
      },
      include: {
        testCases: true,
      },
    });

    if (!problem) {
      return NextResponse.json(
        {
          error: "Problem not found",
        },
        {
          status: 404,
        }
      );
    }

    if (problem.testCases.length === 0) {
      return NextResponse.json(
        {
          error: "No test cases found",
        },
        {
          status: 400,
        }
      );
    }

    const languageId = languageIds[language];

    let finalStatus = "Accepted";

    // Run code against every test case
    for (const testCase of problem.testCases) {
      const judgeResponse = await fetch(
        `${process.env.JUDGE0_URL}/submissions?wait=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_code: code,
            language_id: languageId,
            stdin: testCase.input,
          }),
        }
      );

      if (!judgeResponse.ok) {
        finalStatus = "Execution Service Error";
        break;
      }

      const judgeResult = await judgeResponse.json();

      // Runtime error / compilation error / timeout
      if (judgeResult.status?.id !== 3) {
        finalStatus =
          judgeResult.status?.description ||
          "Execution Error";

        break;
      }

      const actualOutput =
        (judgeResult.stdout || "").trim();

      const expectedOutput =
        testCase.expectedOutput.trim();

      if (actualOutput !== expectedOutput) {
        finalStatus = "Wrong Answer";
        break;
      }
    }

    // Save submission
    const submission = await prisma.submission.create({
      data: {
        problemId,
        language,
        code,
        status: finalStatus,
      },
    });

    return NextResponse.json({
      id: submission.id,
      status: finalStatus,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting",
      },
      {
        status: 500,
      }
    );
  }
}