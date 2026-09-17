import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SubmissionPage({
  params,
}: Props) {
  const { id } = await params;

  const submission = await prisma.submission.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      problem: true,
    },
  });

  if (!submission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">
          Submission #{submission.id}
        </h1>

        <div className="mt-6 space-y-2">
          <p>
            <strong>Problem:</strong>{" "}
            {submission.problem.title}
          </p>

          <p>
            <strong>Language:</strong>{" "}
            {submission.language}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {submission.status}
          </p>
        </div>

        <h2 className="mt-8 text-xl font-semibold">
          Submitted Code
        </h2>

        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 p-6 text-sm text-slate-300">
          {submission.code}
        </pre>
      </div>
    </main>
  );
}