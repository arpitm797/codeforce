import CodeEditor from "@/components/codeEditor";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProblemPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white px-6 py-10 ">
      <div className="mx-auto max-w-7xl">

        <p className="text-sm text-blue-500">
          Problem #{id}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Two Sum
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">

          {/* Problem statement */}
          <section>
            <h2 className="text-xl font-semibold">
              Problem
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Given an array of integers, find two numbers such
              that they add up to a specific target.
            </p>

            <h2 className="mt-8 text-xl font-semibold">
              Input
            </h2>

            <p className="mt-4 text-slate-400">
              The first line contains the number of elements.
            </p>

            <h2 className="mt-8 text-xl font-semibold">
              Output
            </h2>

            <p className="mt-4 text-slate-400">
              Print the indices of the two numbers.
            </p>
          </section>

          {/* Code editor placeholder */}
            <section>
                <h2 className="text-xl font-semibold">
                  Submit Solution
                </h2>

                <div className="mt-4">
                  <CodeEditor problemId={Number(id)} />
                </div>
             </section>

        </div>
      </div>
    </main>
  );
}