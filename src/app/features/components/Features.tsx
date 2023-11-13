"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const [isMounted, setIsMounted] = useState(false);

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

  const featuresMap: { [key: string]: Feature[] } = {
    "must have": mustHave,
    "should have": shouldHave,
    "nice to have": niceToHave,
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination!.droppableId &&
      source.index === destination!.index
    ) {
      return;
    }

    const sourceCard = source.droppableId;
    const destinationCard = destination!.droppableId;

    // moving cards in the same column
    if (sourceCard === destinationCard) {
      const card = featuresMap[sourceCard];
      const draggableItem = featuresMap[sourceCard].find(
        (feature) => feature.id.toString() === draggableId,
      );

      card.splice(source.index, 1);
      card.splice(destination!.index, 0, draggableItem!);
    }

    // moving cards from one column to another
    if (sourceCard !== destinationCard) {
      const cardMovedFrom = featuresMap[sourceCard];
      const cardMovedTo = featuresMap[destinationCard];
      const draggableItem = featuresMap[sourceCard].find(
        (feature) => feature.id.toString() === draggableId,
      );

      cardMovedFrom.splice(source.index, 1);
      cardMovedTo.splice(destination!.index, 0, draggableItem!);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="grid items-start grid-cols-3 gap-x-10">
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </div>
  );
}
