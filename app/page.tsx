export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Practice. Compete. Improve.
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Solve programming problems, participate in contests,
          and improve your competitive programming skills.
        </p>

        <div className="mt-8">
          <button className="rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800">
            Start Solving
          </button>
        </div>
      </div>
    </main>
  );
}