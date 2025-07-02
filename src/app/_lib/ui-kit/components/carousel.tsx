"use client";
import React, {MouseEventHandler, useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

type Props = {
    photos: { id: number, src: string }[]
}
export const Carousel = ({ photos }: Props) => {
    const [current, setCurrent] = useState(0)
    const prev: MouseEventHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrent((current - 1 + photos.length) % photos.length)
    }

    const next: MouseEventHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrent((current + 1) % photos.length)
    }

    const currentPhoto = photos[current]

    return (
        <div className="relative z-0">
            <img
                src={currentPhoto.src}
                alt={`Photo ${currentPhoto.id}`}
                className="rounded-xl w-full h-96 object-cover"
            />
            {photos.length > 1 &&
                <>
                    <button
                        onClick={prev}
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                        aria-label="Previous Photo"
                    >
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
                        aria-label="Next Photo"
                    >
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </>
            }
        </div>
    )
}