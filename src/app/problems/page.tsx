
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Practice
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Problems
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Practice programming problems, improve your
            problem-solving skills, and prepare for contests.
          </p>
        </div>
      </section>

      {/* Problem List */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              All Problems
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {problems.length} problems available
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          {/* Table Header */}
          <div className="hidden grid-cols-[80px_1fr_130px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-medium text-slate-500 md:grid">
            <div>#</div>
            <div>Problem</div>
            <div>Difficulty</div>
          </div>

          {problems.map((problem) => {
            const difficultyClass =
              problem.difficulty === "Easy"
                ? "bg-green-50 text-green-700"
                : problem.difficulty === "Medium"
                ? "bg-yellow-50 text-yellow-700"
                : "bg-red-50 text-red-700";

            return (
              <Link
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="group grid grid-cols-1 gap-3 border-b border-slate-200 px-6 py-5 transition-all duration-200 last:border-b-0 hover:bg-black hover:text-white md:grid-cols-[80px_1fr_130px] md:items-center"
              >
                {/* Number */}
                <div className="text-sm text-slate-400 group-hover:text-slate-500">
                  {String(problem.id).padStart(2, "0")}
                </div>

                {/* Problem information */}
                <div>
                  <h3 className="font-semibold">
                    {problem.title}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-sm text-slate-500 group-hover:text-slate-300">
                    {problem.description}
                  </p>
                </div>

                {/* Difficulty */}
                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${difficultyClass} group-hover:bg-white group-hover:text-black`}
                  >
                    {problem.difficulty}
                  </span>
                </div>
              </Link>
            );
          })}

          {problems.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-medium">
                No problems available.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Check back later for new challenges.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

