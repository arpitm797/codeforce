
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold">
        Problems
      </h1>

      <p className="mt-2 text-gray-600">
        Practice programming problems and improve your skills.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border">
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/problems/${problem.id}`}
            className="group flex items-center justify-between border-b p-5 last:border-b-0 transition-all duration-200 hover:bg-black hover:text-white"
          >
            <div>
              <div className="font-medium transition-colors duration-200 group-hover:text-white">
                {problem.id}. {problem.title}
              </div>

              <p className="mt-1 text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-300">
                {problem.description}
              </p>
            </div>

            <span className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-all duration-200 group-hover:bg-white group-hover:text-black">
              {problem.difficulty}
            </span>
          </Link>
        ))}

        {problems.length === 0 && (
          <p className="p-5 text-gray-500">
            No problems available.
          </p>
        )}
      </div>
    </main>
  );
}
