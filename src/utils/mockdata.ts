export function getMockDate(searchParams?: URLSearchParams): Date {
    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const mockDate = params.get("mockDate");
        if (mockDate) return new Date(mockDate);
    }
    return searchParams?.get("mockDate")
        ? new Date(searchParams.get("mockDate")!)
        : new Date();
}

export function appendMockDate(url: string): string {
    if (typeof window === "undefined") return url;
    const mockDate = new URLSearchParams(window.location.search).get(
        "mockDate",
    );
    if (!mockDate) return url;

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}mockDate=${mockDate}`;
}
