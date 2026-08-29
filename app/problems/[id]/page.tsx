type ProblemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemPage({
  params,
}: ProblemPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid grid-cols-2 gap-8">
        
        {/* Problem statement */}
        <div>
          <h1 className="text-3xl font-bold">
            Two Sum
          </h1>

          <p className="mt-4 text-gray-700">
            Given an array of integers nums and an integer target,
            return indices of the two numbers such that they add up
            to target.
          </p>

          <h2 className="mt-8 text-xl font-semibold">
            Example
          </h2>

          <div className="mt-4 rounded-lg bg-gray-100 p-4">
            <p>
              <strong>Input:</strong> nums = [2,7,11,15], target = 9
            </p>

            <p className="mt-2">
              <strong>Output:</strong> [0,1]
            </p>
          </div>

          <h2 className="mt-8 text-xl font-semibold">
            Constraints
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-700">
            <li>2 ≤ nums.length ≤ 10⁴</li>
            <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
            <li>-10⁹ ≤ target ≤ 10⁹</li>
          </ul>
        </div>

        {/* Code editor placeholder */}
        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">
            Code Editor
          </div>

          <div className="h-96 bg-gray-950 p-4 font-mono text-sm text-white">
            Write your code here...
          </div>
        </div>

      </div>
    </main>
  );
}