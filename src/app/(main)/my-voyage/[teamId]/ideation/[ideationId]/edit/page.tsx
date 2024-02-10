import { redirect } from "next/navigation";
import IdeationForm from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationForm";
import { getCookie } from "@/utils/getCookie";

export default function EditIdeationPage() {
  const cookie = getCookie();

  if (!cookie) redirect("/");

  return <IdeationForm />;
}
