import Link from "next/link";

interface DropDownLinkProps {
  title: string;
  href?: string;
}

export default function DropDownLink({
  title,
  href = "#",
}: DropDownLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-neutral hover:text-primary duration-200"
      >
        {title}
      </Link>
    </li>
  );
}
