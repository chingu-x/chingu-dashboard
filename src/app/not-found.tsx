import ErrorComponent from "@/components/Error";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-start justify-center">
      <ErrorComponent message="This page could not be found" />
    </div>
  );
}

export default NotFoundPage;
