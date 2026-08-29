import Link from "next/link";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Map"],
  },
  {
    id: 2,
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Searching", "Array"],
  },
  {
    id: 3,
    title: "Longest Substring",
    difficulty: "Medium",
    tags: ["String", "Sliding Window"],
  },
  {
    id: 4,
    title: "Number of Islands",
    difficulty: "Medium",
    tags: ["Graph", "BFS"],
  },
  {
    id: 5,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    tags: ["Linked List", "Heap"],
  },
];

export default function ProblemsPage() {
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

              <div className="mt-2 flex gap-2">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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