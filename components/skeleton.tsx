import React from "react";

function Skeleton() {
  return (
    <div className="w-full min-h-screen  flex flex-col lg:flex-row gap-4 px-4 mt-20">
      <div className="flex flex-col gap-5 w-full lg:w-[30%]">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="flex flex-col gap-5 w-full lg:w-[70%]">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#111] rounded-xl p-5 shadow-lg border border-white/5 w-full">
      <div className="h-48 w-full rounded-xl shimmer"></div>
    </div>
  );
}

export default Skeleton;
