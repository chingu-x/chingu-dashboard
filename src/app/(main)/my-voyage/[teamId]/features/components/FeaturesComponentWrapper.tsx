import { redirect } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import FeaturesProvider from "./FeaturesProvider";
import FeaturesContainer from "./FeaturesContainer";
import ErrorComponent from "@/components/Error";

import {
  type Features,
  type FeaturesList,
} from "@/store/features/features/featuresSlice";

import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { getUser } from "@/utils/getUser";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { ErrorType } from "@/utils/error";

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

interface FetchFeaturesProps {
  teamId: number;
}

export async function fetchFeatures({
  teamId,
}: FetchFeaturesProps): Promise<AsyncActionResponse<FeaturesList[]>> {
  let data: FeaturesList[] | null = [];
  const token = getAccessToken();

  const fetchFeaturesAsync = () =>
    GET<Features[]>(
      `api/v1/voyages/teams/${teamId}/features`,
      token,
      "force-cache",
      CacheTag.features,
    );

  const [res, error] = await handleAsync(fetchFeaturesAsync);

  if (res) {
    data = transformData(res);
  }

  return [data, error];
}

interface FeaturesComponentWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function FeaturesComponentWrapper({
  params,
}: FeaturesComponentWrapperProps) {
  let features = [];

  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchFeatures,
  });

  if (errorResponse) {
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_VOYAGE_DATA}
        message={errorResponse}
      />
    );
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return (
        <ErrorComponent
          errorType={ErrorType.FETCH_FEATURES}
          message={error.message}
        />
      );
    }

    features = res!;
  } else {
    redirect("/");
  }

  return (
    <>
      <BannerContainer
        title="Features"
        description="What's on the feature menu for our app? We want only the crème de la crème, so prioritize wisely. Remember, we're building an app, not a buffet."
      >
        <Banner
          imageLight={
            <Image
              src="/img/features_banner_light.png"
              alt="Light features banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/features_banner_dark.png"
              alt="Dark features banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[200px]"
          width="w-[276px]"
        />
      </BannerContainer>
      <FeaturesProvider payload={features} />
      <FeaturesContainer data={features} />
    </>
  );
}
