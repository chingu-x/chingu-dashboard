// replace with dashboard page when that's completed
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        className="p-5 font-medium transition rounded-lg bg-secondary hover:bg-secondary-focus"
        href="/my-voyage/example1"
      >
        Intercepting Modal 1
      </Link>
      <Link
        className="p-5 font-medium transition rounded-lg bg-secondary hover:bg-secondary-focus"
        href="/my-voyage/example2"
      >
        Intercepting Modal 2
      </Link>
    </>
  );
}
