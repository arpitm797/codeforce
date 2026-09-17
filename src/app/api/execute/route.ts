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

    if (!problem.functionName) {
      return NextResponse.json(
        {
          error: "Function name is not configured for this problem",
        },
        { status: 500 }
      );
    }

    const results = [];

    for (const testCase of problem.testCases) {
      const result = await runJavaScript(
        code,
        problem.functionName,
        testCase.input
      );

      const actual = result.stdout.trim();
      const expected = testCase.output.trim();

      let passed = false;

      try {
        const actualJson = JSON.parse(actual);
        const expectedJson = JSON.parse(expected);

        passed =
          JSON.stringify(actualJson) ===
          JSON.stringify(expectedJson);
      } catch {
        passed = actual === expected;
      }

      let status:
        | "ACCEPTED"
        | "WRONG_ANSWER"
        | "RUNTIME_ERROR"
        | "TIME_LIMIT";

      if (result.timedOut) {
        status = "TIME_LIMIT";
      } else if (result.stderr) {
        status = "RUNTIME_ERROR";
      } else if (passed) {
        status = "ACCEPTED";
      } else {
        status = "WRONG_ANSWER";
      }

      results.push({
        testCaseId: testCase.id,
        input: testCase.input,
        expected,
        actual,
        status,
        passed,
        error: result.stderr || null,
        timedOut: result.timedOut,
      });
    }

    const allPassed =
      results.length > 0 &&
      results.every((result) => result.passed);

    let finalStatus:
      | "ACCEPTED"
      | "WRONG_ANSWER"
      | "RUNTIME_ERROR"
      | "TIME_LIMIT";

    if (allPassed) {
      finalStatus = "ACCEPTED";
    } else if (
      results.some(
        (result) => result.status === "TIME_LIMIT"
      )
    ) {
      finalStatus = "TIME_LIMIT";
    } else if (
      results.some(
        (result) => result.status === "RUNTIME_ERROR"
      )
    ) {
      finalStatus = "RUNTIME_ERROR";
    } else {
      finalStatus = "WRONG_ANSWER";
    }

    await prisma.submission.create({
      data: {
        code,
        language,
        status: finalStatus,
        problemId: Number(problemId),
      },
    });

    return NextResponse.json({
      success: true,
      problem: problem.title,
      passed: allPassed,
      status: finalStatus,
      results,
    });
  } catch (error) {
    console.error("Execution error:", error);

    return NextResponse.json(
      {
        error: "Execution failed",
      },
      { status: 500 }
    );
  }
}