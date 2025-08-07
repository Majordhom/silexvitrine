"use client";
import TheoPropertyCardSkeleton from './TheoPropertyCardSkeleton';

interface TheoPropertyGridSkeletonProps {
    count?: number;
    className?: string;
}

export default function TheoPropertyGridSkeleton({ 
    count = 6, 
    className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
}: TheoPropertyGridSkeletonProps) {
    return (
        <div className={className}>
            {Array.from({ length: count }, (_, index) => (
                <TheoPropertyCardSkeleton key={index} />
            ))}
        </div>
    );
}