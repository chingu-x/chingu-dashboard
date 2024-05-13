"use client";

import { useEffect, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

// import { FeaturesList } from "./fixtures/Features";
import List from "./List";
import { type FeaturesList } from "@/store/features/features/featuresSlice";
import { saveOrder } from "@/myVoyage/features/featuresService";
import { useAppDispatch } from "@/store/hooks";
import { onOpenModal } from "@/store/features/modal/modalSlice";

interface FeaturesContainerProps {
  data: FeaturesList[];
}

export default function FeaturesContainer({ data }: FeaturesContainerProps) {
  const [orderedData, setOrderedData] = useState(data);
  const dispatch = useAppDispatch();

  const onDragEnd = async (result: DropResult) => {
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

    const newOrderedData = orderedData.map((list) => ({
      ...list,
      features: [...list.features],
    }));

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
        card.order = idx + 1;
      });

      sourceList.features = reorderedCards;
      setOrderedData(newOrderedData);

      const [, error] = await saveOrder({
        featureId: removed.id,
        order: removed.order,
        featureCategoryId: removed.category.id,
      });

      if (error) {
        setOrderedData(data);
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }
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
        card.order = idx + 1;
      });

      // Update the order for each card in the destination list
      destList.features.forEach((card, idx) => {
        card.order = idx + 1;
      });

      setOrderedData(newOrderedData);

      const [, error] = await saveOrder({
        featureId: movedCard.id,
        order: movedCard.order,
        featureCategoryId: movedCard.category.id,
      });

      if (error) {
        setOrderedData(data);
        dispatch(
          onOpenModal({ type: "error", content: { message: error.message } }),
        );
      }
    }
  };

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <div className="grid items-start grid-cols-3 gap-x-10">
      <DragDropContext onDragEnd={onDragEnd}>
        {orderedData.map((list) => (
          <List
            id={list.categoryId}
            key={list.categoryId}
            title={list.categoryName}
            features={list.features}
          />
        ))}
      </DragDropContext>
    </div>
  );
}
