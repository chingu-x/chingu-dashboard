"use client";

import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import { FeaturesList } from "./fixtures/Features";
import List from "./List";

interface FeaturesContainerProps {
  data: FeaturesList[];
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function FeaturesContainer({
  data,
  currentUser,
}: FeaturesContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // dropped nowhere
    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newOrderedData = [...orderedData];

    // source and destination lists
    const sourceList = newOrderedData.find(
      (list) => list.categoryId.toString() === source.droppableId,
    );
    const destList = newOrderedData.find(
      (list) => list.categoryId.toString() === destination.droppableId,
    );

    if (!sourceList || !destList) {
      return;
    }

    // moving cards in the same column
    if (source.droppableId === destination.droppableId) {
      // Update order
      const reorderedCards = [...sourceList.features];
      const [removed] = reorderedCards.splice(source.index, 1);
      reorderedCards.splice(destination.index, 0, removed);

      reorderedCards.forEach((card, idx) => {
        card.order = idx;
      });

      sourceList.features = reorderedCards;
      setOrderedData(newOrderedData);
    }

    // moving cards from one column to another
    if (source.droppableId !== destination.droppableId) {
      // Remove card from the source list
      const [movedCard] = sourceList.features.splice(source.index, 1);

      // Assign the new categoryId to the moved card
      movedCard.category.id = +destination.droppableId;

      // Add card to the destination list
      destList.features.splice(destination.index, 0, movedCard);

      sourceList.features.forEach((card, idx) => {
        card.order = idx;
      });

      // Update the order for each card in the destination list
      destList.features.forEach((card, idx) => {
        card.order = idx;
      });

      setOrderedData(newOrderedData);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="grid items-start grid-cols-3 gap-x-10">
      <DragDropContext onDragEnd={onDragEnd}>
        {orderedData.map((list) => (
          <List
            id={list.categoryId.toString()}
            key={list.categoryId}
            title={list.categoryName}
            features={list.features}
            currentUser={currentUser}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
