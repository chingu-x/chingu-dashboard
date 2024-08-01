import { SelectedCategory } from "../finalize/utils/getSelectedTechItems";
import GetIcon from "./GetIcons";

interface FinalizedTechStackCardProps {
  title: string;
  data: SelectedCategory
}

export default function FinalizedTechStackCard({
  title,
  data,
}: FinalizedTechStackCardProps) {
  console.log(data);
  return (
    <>
      <div className="h-80 min-w-[420px] rounded-lg bg-base-200 p-5 text-base-300 sm:w-96">
        <div className="flex flex-row justify-start">
          {GetIcon(title)}
          <span className="self-center text-xl font-semibold text-base-300">
            {title}
          </span>
        </div>
          {data.techItems.map((item) =>
            <FinalizedTechListItem key={item.id} name={item.name} />
          )}
      </div>
    </>
  );
}

interface FinalizedTechListItem {
  name: string;
}
export function FinalizedTechListItem({ name }: FinalizedTechListItem) {
  return (
    <div className="h-10 w-10 border w-full my-2">
      <h1>{name}</h1>
      <div>avatars of group</div>
    </div>
  );
}
