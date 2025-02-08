interface QuestionHeaderProps {
  children: React.ReactNode;
}

export default function QuestionHeader({ children }: QuestionHeaderProps) {
  return <h2 className="text-2xl font-semibold text-base-300">{children}</h2>;
}
