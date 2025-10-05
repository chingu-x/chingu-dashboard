import React, { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import VoyageDashboard from "./VoyageDashboard";

interface VoyageDashboardPageProps {
    teamId?: string;
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
function VoyageDashboardPage({
    teamId,
    searchParams,
}: VoyageDashboardPageProps) {
    return (
        <Suspense fallback={<Spinner />}>
            <VoyageDashboard teamId={teamId} searchParams={searchParams} />
        </Suspense>
    );
}

export default VoyageDashboardPage;
