import FeatureCard from "./FeatureCard";
import { Feature } from "./fixtures/Features";

interface FeaturesProps {
  features: Feature[];
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function Features({ features, currentUser }: FeaturesProps) {
  // TODO: change to feature.category.id maybe if they don't change or leave like this
  const mustHave = features.filter(
    (feature) => feature.category.name === "must have",
  );
  const shouldHave = features.filter(
    (feature) => feature.category.name === "should have",
  );
  const niceToHave = features.filter(
    (feature) => feature.category.name === "nice to have",
  );
  return (
    <div className="flex items-start gap-x-10">
      <FeatureCard
        title="must have"
        features={mustHave}
        currentUser={currentUser}
      />
      <FeatureCard
        title="should have"
        features={shouldHave}
        currentUser={currentUser}
      />
      <FeatureCard
        title="nice to have"
        features={niceToHave}
        currentUser={currentUser}
      />
    </div>
  );
}
