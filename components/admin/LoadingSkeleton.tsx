export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-slate-200 rounded-lg animate-pulse"></div>
      <div className="h-64 bg-slate-200 rounded-lg animate-pulse"></div>
    </div>
  );
}
