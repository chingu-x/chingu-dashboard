type Member = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type VotedBy = {
  member: Member;
};

type TeamTechStackItemVote = {
  votedBy: VotedBy;
};

type TechItem = {
  id: number;
  name: string;
  isSelected: boolean;
  teamTechStackItemVotes: TeamTechStackItemVote[];
};

type Category = {
  id: number;
  title: string;
  techItems: TechItem[];
};

type SelectedTechItem = {
  id: number;
  name: string;
  isSelected: boolean;
  teamTechStackItemVotes: TeamTechStackItemVote[];
};

export type SelectedCategory = {
  title: string;
  techItems: SelectedTechItem[];
};


export const getSelectedTechItems = (categories: Category[]): SelectedCategory[] => {
  const selectedCategories: SelectedCategory[] = [];

  categories.forEach(category => {
    const selectedTechItems: SelectedTechItem[] = category.techItems.filter(techItem => techItem.isSelected);

    if (selectedTechItems.length > 0) {
      selectedCategories.push({
        title: category.title,
        techItems: selectedTechItems,
      });
    }
  });

  return selectedCategories;
};
