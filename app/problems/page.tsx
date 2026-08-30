import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">Problems</h1>

      <p className="mt-2 text-gray-600">
        Practice programming problems and improve your skills.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="flex items-center justify-between border-b p-5 last:border-b-0"
          >
            <div>
              <Link
                href={`/problems/${problem.id}`}
                className="font-medium hover:underline"
              >
                {problem.id}. {problem.title}
              </Link>
            </div>

            <span className="text-sm text-gray-600">
              {problem.difficulty}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}