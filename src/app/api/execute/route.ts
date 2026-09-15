import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { runJavaScript } from "@/lib/sandbox";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { code, language, problemId } = body;

    if (!code || !language || !problemId) {
      return NextResponse.json(
        {
          error: "code, language and problemId are required",
        },
        { status: 400 }
      );
    }

    if (language !== "javascript") {
      return NextResponse.json(
        {
          error: "Only JavaScript is supported right now",
        },
        { status: 400 }
      );
    }

    const problem = await prisma.problem.findUnique({
      where: {
        id: Number(problemId),
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
        { status: 404 }
      );
    }

    const results = [];

    for (const testCase of problem.testCases) {
      const result = await runJavaScript(
        code,
        testCase.input
      );

          const actual = result.stdout.trim();
          const expected = testCase.output.trim();

          let status: "PASSED" | "WRONG_ANSWER" | "RUNTIME_ERROR" | "TIME_LIMIT";

          if (result.timedOut) {
            status = "TIME_LIMIT";
          } else if (result.stderr) {
            status = "RUNTIME_ERROR";
          } else if (actual === expected) {
            status = "PASSED";
          } else {
            status = "WRONG_ANSWER";
          }

          results.push({
            testCaseId: testCase.id,
            input: testCase.input,
            expected,
            actual,
            status,
            passed: status === "PASSED",
            error: result.stderr || null,
            timedOut: result.timedOut,
          });
          if (status === "RUNTIME_ERROR" || status === "TIME_LIMIT") {
              break;
            }
    }
     console.log("JUDGE RESULTS:", results);
    const allPassed = results.every(
      (result) => result.passed
    );

    return NextResponse.json({
      success: true,
      problem: problem.title,
      passed: allPassed,
      results,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Execution failed",
      },
      { status: 500 }
    );
  }
}