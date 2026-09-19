
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
            Competitive Programming Platform
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Solve Problems.
            <br />
            <span className="text-slate-500">
              Compete. Improve.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            Practice programming problems, sharpen your
            problem-solving skills, participate in contests,
            and compete with other developers.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/problems"
              className="rounded-lg bg-black px-6 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Browse Problems →
            </Link>

            <Link
              href="/contests"
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:bg-slate-50"
            >
              Explore Contests
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="p-8">
            <p className="text-sm font-medium text-slate-500">
              Problems
            </p>
            <p className="mt-2 text-3xl font-bold">
              3+
            </p>
          </div>

          <div className="p-8">
            <p className="text-sm font-medium text-slate-500">
              Contests
            </p>
            <p className="mt-2 text-3xl font-bold">
              Coming Soon
            </p>
          </div>

          <div className="p-8">
            <p className="text-sm font-medium text-slate-500">
              Online Judge
            </p>
            <p className="mt-2 text-3xl font-bold">
              Docker
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Platform
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Everything you need to practice
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/problems"
            className="group rounded-xl border border-slate-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
          >
            <div className="mb-6 text-3xl">⚡</div>

            <h3 className="text-xl font-semibold">
              Practice Problems
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-slate-300">
              Solve coding problems with an online
              judge and get instant feedback.
            </p>

            <p className="mt-6 text-sm font-medium">
              Start solving →
            </p>
          </Link>

          <Link
            href="/contests"
            className="group rounded-xl border border-slate-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
          >
            <div className="mb-6 text-3xl">🏆</div>

            <h3 className="text-xl font-semibold">
              Compete
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-slate-300">
              Participate in programming contests and
              challenge yourself against others.
            </p>

            <p className="mt-6 text-sm font-medium">
              View contests →
            </p>
          </Link>

          <Link
            href="/ranking"
            className="group rounded-xl border border-slate-200 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-black hover:bg-black hover:text-white"
          >
            <div className="mb-6 text-3xl">📊</div>

            <h3 className="text-xl font-semibold">
              Ranking
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500 group-hover:text-slate-300">
              Track your progress and see how you compare
              with other competitive programmers.
            </p>

            <p className="mt-6 text-sm font-medium">
              View ranking →
            </p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl bg-black px-8 py-12 text-white md:px-12">
          <h2 className="text-3xl font-bold">
            Ready to start solving?
          </h2>

          <p className="mt-3 max-w-xl text-slate-400">
            Pick a problem, write your solution, and
            test it against our Docker-powered online judge.
          </p>

          <Link
            href="/problems"
            className="mt-7 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-slate-200"
          >
            Start Solving →
          </Link>
        </div>
      </section>
    </main>
  );
}
