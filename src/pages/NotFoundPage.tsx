import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[66vh] gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl/4xl">
          Page not found
        </h1>
        <p className="text-gray-500">
          Sorry, we couldn't find the page you were looking for.
        </p>
      </div>
      <a
        className="inline-flex h-10 items-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Return home
      </a>
    </div>
  );
}
