import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black ">
      <h1 className="mt-20 text-2xl tracking-widest font-medium">Competitive programing</h1>
      <h2 className="text-5xl pt-20 font-bold">Solve Problems. <br />Compete.Improve</h2>
      <p className="text-xl pt-10 mt-2 mb-10 italic">Practice Competitive programming,participate in contests,and improve problm solving skills</p>
      <div className="flex gap-10 m-8">
      <Link className="bg-blue-600 rounded-2xl p-3 text-white hover:bg-blue-500 " href="/problems">Browse Problems</Link>
      <Link className="bg-black rounded-2xl p-3 px-5 text-white hover:bg-blue-500 " href="/contests">Contests</Link>
      </div>
    </div>
    

  );
}
