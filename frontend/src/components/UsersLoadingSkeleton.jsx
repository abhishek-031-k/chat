const UsersLoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3 p-2">
      {/* Hum sirf items ka skeleton banayenge, 
          header ka nahi kyunki header pehle se upar mounted hai. */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse p-2">
          <div className="size-12 rounded-full bg-slate-700/50" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-700/50 rounded w-1/2" />
            <div className="h-3 bg-slate-700/50 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersLoadingSkeleton;