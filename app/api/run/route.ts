import { NextResponse } from "next/server";
import { z } from "zod";

const runCodeSchema = z.object({
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

    const result = runCodeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const { language, code } = result.data;

    const languageId = languageIds[language];

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
        }),
      }
    );

    if (!judgeResponse.ok) {
      return NextResponse.json(
        {
          error: "Code execution service failed",
        },
        {
          status: 500,
        }
      );
    }

    const judgeResult = await judgeResponse.json();

    return NextResponse.json({
      output:
        judgeResult.stdout ||
        judgeResult.stderr ||
        judgeResult.compile_output ||
        judgeResult.message ||
        judgeResult.status?.description ||
        "No output",
      status: judgeResult.status?.description,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong while running the code",
      },
      {
        status: 500,
      }
    );
  }
}