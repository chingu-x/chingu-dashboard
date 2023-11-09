import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="flex gap-x-10">
      <FeatureCard title="must have" />
      <FeatureCard title="should have" />
      <FeatureCard title="nice to have" />
    </div>
  );
}
