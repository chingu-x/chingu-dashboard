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
        className="flex w-full items-center justify-start border-[1px] border-transparent p-2 font-semibold text-base-300 duration-200 hover:rounded-lg hover:bg-neutral-content hover:text-base-300"
      >
        {title}
      </Link>
    </li>
  );
}
