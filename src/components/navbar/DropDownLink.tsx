import Link from "next/link";

interface DropDownLinkProps {
  title: string;
  href?: string;
}

export default function DropDownLink({ title, href = "#" }: DropDownLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-start p-2 w-full border-[1px] border-transparent font-semibold text-base-300 hover:text-base-300 duration-200 hover:bg-neutral-content hover:rounded-lg"
      >
        {title}
      </Link>
    </li>
  );
}
