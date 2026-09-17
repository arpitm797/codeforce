import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    include: {
      problem: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Submission History
        </h1>

        <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Problem</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-t"
                >
                 <td className="px-4 py-3">
                    <Link
                        href={`/submissions/${submission.id}`}
                        className="text-blue-600 hover:underline"
                    >
                        #{submission.id}
                    </Link>
                 </td>

                  <td className="px-4 py-3">
                    {submission.problem.title}
                  </td>

                  <td className="px-4 py-3">
                    {submission.language}
                  </td>

                    <td className="px-4 py-3">
                        <span
                            className={
                            submission.status === "ACCEPTED"
                                ? "font-medium text-green-600"
                                : submission.status === "WRONG_ANSWER"
                                ? "font-medium text-red-600"
                                : submission.status === "RUNTIME_ERROR"
                                ? "font-medium text-orange-600"
                                : submission.status === "TIME_LIMIT"
                                ? "font-medium text-yellow-600"
                                : "font-medium text-gray-600"
                            }
                        >
                            {submission.status === "ACCEPTED"
                            ? "Accepted"
                            : submission.status === "WRONG_ANSWER"
                            ? "Wrong Answer"
                            : submission.status === "RUNTIME_ERROR"
                            ? "Runtime Error"
                            : submission.status === "TIME_LIMIT"
                            ? "Time Limit Exceeded"
                            : submission.status}
                        </span>
                    </td>

                  <td className="px-4 py-3 text-slate-500">
                    {submission.createdAt.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}