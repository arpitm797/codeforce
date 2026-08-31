import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      problem: true,
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Submission History
          </h1>

          <p className="mt-2 text-gray-600">
            View your previous code submissions.
          </p>
        </div>

        <Link
          href="/problems"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Problems
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border">
        {submissions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No submissions yet.
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-4 border-b bg-gray-50 p-4 text-sm font-semibold">
              <span>ID</span>
              <span>Problem</span>
              <span>Language</span>
              <span>Status</span>
            </div>

            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="grid grid-cols-4 border-b p-4 text-sm last:border-b-0"
              >
                <span>{submission.id}</span>

                <Link
                  href={`/problems/${submission.problem.id}`}
                  className="font-medium hover:underline"
                >
                  {submission.problem.title}
                </Link>

                <span className="capitalize">
                  {submission.language}
                </span>

                <span>{submission.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}