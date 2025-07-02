"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingFormPage = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-gray-950 to-gray-700 justify-center items-center p-4">
      <div className="w-full max-w-md bg-stone-300 p-6 rounded-3xl space-y-4 shadow-lg">
        {/* Title */}
        <Skeleton className="h-6 w-40 mx-auto" />

        {/* Form field lines */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
          </div>
        ))}

        {/* Submit button skeleton */}
        <div className="pt-4">
          <Skeleton className="h-10 w-32 mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingFormPage;
