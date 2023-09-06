import Link from "next/link";

interface DropDownLinkProps {
  title: string;
  href?: string;
  handleClick: () => void;
}

export default function DropDownLink({ title, href = "#", handleClick }: DropDownLinkProps) {
  return (
    <Link href={href} className="text-neutral hover:text-primary duration-200" onClick={handleClick}>{title}</Link>
  );
}
