import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CodeEditor from "@/components/CodeEditor";

type ProblemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemPage({
  params,
}: ProblemPageProps) {
  const { id } = await params;

  const problem = await prisma.problem.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!problem) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-bold">Problem not found</h1>

        <Link
          href="/problems"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ← Back to problems
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/problems"
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back to problems
      </Link>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {problem.id}. {problem.title}
          </h1>

          <span className="rounded bg-gray-100 px-3 py-1 text-sm">
            {problem.difficulty}
          </span>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">
            Problem Description
          </h2>

          <p className="mt-3 leading-7 text-gray-700">
            {problem.description}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            Your Solution
          </h2>

          <div className="mt-4 overflow-hidden rounded-lg border">
            <CodeEditor problemId={problem.id} />
          </div>
        </div>
      </div>
    </main>
  );
}