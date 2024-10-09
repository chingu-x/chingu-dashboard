/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useEffect, useState } from "react";
import FeaturesContainer from "./FeaturesContainer";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";
import {
  type Features,
  type FeaturesList,
} from "@/store/features/features/featuresSlice";
import { axiosInstance } from "@/utils/axiosInstance";

function transformData(features: Features[]): FeaturesList[] {
  const transformedData: FeaturesList[] = [
    {
      categoryId: 1,
      categoryName: "must have",
      features: [],
    },
    {
      categoryId: 2,
      categoryName: "should have",
      features: [],
    },
    {
      categoryId: 3,
      categoryName: "nice to have",
      features: [],
    },
  ];

  features.forEach((feature) => {
    const {
      id,
      description,
      order,
      teamMemberId,
      category,
      addedBy,
      createdAt,
      updatedAt,
    } = feature;

    const existingCategory = transformedData.find(
      (item) => item.categoryId === category.id,
    );

    if (existingCategory) {
      existingCategory.features.push({
        id,
        description,
        order,
        teamMemberId,
        category,
        addedBy,
        createdAt,
        updatedAt,
      });
    }
  });

  return transformedData;
}

// interface FetchFeaturesProps {
//   teamId: number;
// }

// export async function fetchFeatures({
//   teamId,
// }: FetchFeaturesProps): Promise<AsyncActionResponse<FeaturesList[]>> {
//   let data: FeaturesList[] | null = [];
//   const token = getAccessToken();

//   const fetchFeaturesAsync = () =>
//     GET<Features[]>(
//       `api/v1/voyages/teams/${teamId}/features`,
//       token,
//       "force-cache",
//       CacheTag.features,
//     );

//   const [res, error] = await handleAsync(fetchFeaturesAsync);

//   if (res) {
//     data = transformData(res);
//   }

//   return [data, error];
// }

interface FeaturesComponentWrapperProps {
  params: {
    teamId: string;
  };
}

export default function FeaturesComponentWrapper({
  params,
}: FeaturesComponentWrapperProps) {
  // let features = [];

  const teamId = Number(params.teamId);
  const [features, setFeatures] = useState<FeaturesList[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v1/voyages/teams/${teamId}/features`,
        );

        return response.data;
      } catch (error: any) {
        throw Error(error);
      }
    };

    fetchFeatures()
      .then((data) => {
        const features = transformData(data);
        setFeatures(features);
      })
      .catch((err) => {
        throw Error(err);
      });
  }, [teamId]);

  // const [user, error] = await getUser();

  // const { errorResponse, data } = await getCurrentVoyageData({
  //   user,
  //   error,
  //   teamId,
  //   args: { teamId },
  //   func: fetchFeatures,
  // });

  // if (errorResponse) {
  //   return (
  //     <ErrorComponent
  //       errorType={ErrorType.FETCH_VOYAGE_DATA}
  //       message={errorResponse}
  //     />
  //   );
  // }

  // if (data) {
  //   const [res, error] = data;

  //   if (error) {
  //     return (
  //       <ErrorComponent
  //         errorType={ErrorType.FETCH_FEATURES}
  //         message={error.message}
  //       />
  //     );
  //   }

  //   features = res!;
  // } else {
  //   redirect("/");
  // }

  return (
    <>
      <VoyagePageBannerContainer
        title="Features"
        description="What's on the feature menu for our app? We want only the crème de la crème, so prioritize wisely. Remember, we're building an app, not a buffet."
      >
        <Banner
          imageLight="/img/features_banner_light.png"
          imageDark="/img/features_banner_dark.png"
          alt="features_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      {/* <FeaturesProvider payload={features} /> */}
      <FeaturesContainer data={features} />
    </>
  );
}
