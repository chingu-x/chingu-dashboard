import { redirect } from "next/navigation";
import IdeationForm from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationForm";
import { getAccessToken } from "@/utils/getCookie";

export default function EditIdeationPage() {
  const cookie = getAccessToken();

  if (!cookie) redirect("/");

  return <IdeationForm />;
}
