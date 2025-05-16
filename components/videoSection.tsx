"use client"

import { useState, useRef, useEffect } from "react"
import { Video, X, Minimize, Maximize, Play } from 'lucide-react'

// Video data with local file paths
const videoPlaceholders = [
  {
    id: 1,
    title: "Florence & Damien Wishes",
    videoPath: "/videos/1.mp4",
    thumbnail: "/images/thumbnails/1.jpg",
    description: "Wishes",
  },
  {
    id: 2,
    title: "A song from loved ones",
    videoPath: "/videos/2.mp4",
    thumbnail: "/images/thumbnails/2.jpg",
    description: "",
  },
  {
    id: 3,
    title: "Birthday Memories",
    videoPath: "/videos/birthday-memories.mp4",
    thumbnail: "/images/thumbnails/birthday-memories.jpg",
    description: "Highlights from previous celebrations",
  },
  {
    id: 4,
    title: "Damien & Dennis's Special Moments",
    videoPath: "/videos/special-moments.mp4",
    thumbnail: "/images/thumbnails/special-moments.jpg",
    description: "A collection of Damien & Dennis's best memories",
  },
]

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [videoError, setVideoError] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const openFullscreen = (videoId: number) => {
    setActiveVideo(videoId)
    setIsMinimized(false)
    setVideoError(false)
    // Allow scrolling while video is playing
    document.body.style.overflow = "auto"
  }

  const closeFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setActiveVideo(null)
    setIsMinimized(false)
    document.body.style.overflow = "auto"
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleVideoError = () => {
    setVideoError(true)
    console.error("Video failed to load")
  }

  // Reset video error when changing videos
  useEffect(() => {
    setVideoError(false)
  }, [activeVideo])

  const activeVideoData = activeVideo !== null ? videoPlaceholders.find((v) => v.id === activeVideo) : null

  return (
    <section className="bg-blue-500 bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
        <Video className="mr-2" />
        Celebration Highlights Videos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videoPlaceholders.map((video) => (
          <div
            key={video.id}
            className="bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => openFullscreen(video.id)}
          >
            <div className="relative aspect-video bg-gray-800/30">
              <img
                src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=200&width=350"
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-500 bg-opacity-70 rounded-full p-3">
                  <Play className="text-white" size={24} />
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-1">{video.title}</h3>
              <p className="text-white text-opacity-80 text-sm">{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {activeVideo !== null && activeVideoData && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? "bottom-4 right-4 w-80 h-auto"
              : "inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
          } modal-animation`}
        >
          <div className={`relative ${isMinimized ? "w-full" : "w-full max-w-4xl"}`}>
            {/* Fixed control bar at the top - always visible */}
            <div className="sticky top-0 left-0 right-0 z-30 flex justify-end p-4 bg-gradient-to-b from-black to-transparent">
              <div className="flex space-x-3">
                <button
                  onClick={toggleMinimize}
                  className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 focus:outline-none shadow-lg"
                  aria-label={isMinimized ? "Maximize video" : "Minimize video"}
                >
                  {isMinimized ? <Maximize size={24} /> : <Minimize size={24} />}
                </button>
                <button
                  onClick={closeFullscreen}
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 focus:outline-none shadow-lg"
                  aria-label="Close video"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Video container */}
            <div className={`${isMinimized ? "" : "aspect-video"} bg-black rounded-lg overflow-hidden mt-2`}>
              {videoError ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-white">
                  <p className="text-red-400 mb-2">Video failed to load</p>
                  <p className="text-sm text-center">
                    Please check that your video files are in the correct location and format.
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={activeVideoData.videoPath}
                  poster={activeVideoData.thumbnail}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onError={handleVideoError}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Video info */}
            {!isMinimized && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold text-white">{activeVideoData.title}</h3>
                <p className="text-white opacity-80">{activeVideoData.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}