export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
      <p className="text-sm font-medium text-gray-500 animate-pulse">Loading...</p>
    </div>
  );
}
