import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        
        <Link href="/" className="text-xl font-bold">
          CodeArena
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/problems"
            className="text-gray-600 hover:text-black"
          >
            Problems
          </Link>

          <Link
            href="/contests"
            className="text-gray-600 hover:text-black"
          >
            Contests
          </Link>

          <Link
            href="/rankings"
            className="text-gray-600 hover:text-black"
          >
            Rankings
          </Link>

          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}