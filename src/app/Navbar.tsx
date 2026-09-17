import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-6 bg-black text-white">
      <div className="flex justify-between">
        <Link href="/">Home</Link>

        <div className="flex gap-6">
          <Link href="/problems">Problems</Link>
          <Link href="/contests">Contests</Link>
          <Link href="/ranking">Ranking</Link>
          <Link href="/submissions">Submissions</Link>
        </div>
      </div>
    </nav>
  );
}