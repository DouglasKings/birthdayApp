"use client"

import { useState, useEffect } from "react"
import { PartyPopper } from "lucide-react"
import Confetti from "@/components/confetti"
import BirthdayCard from "@/components/birthdayCard"
import VideoSection from "@/components/videoSection"

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [damienDaysLeft, setDamienDaysLeft] = useState(0)
  const [dennisDaysLeft, setDennisDaysLeft] = useState(0)

  useEffect(() => {
    // Calculate days left for each birthday
    const calculateDaysLeft = () => {
      const today = new Date()
      const currentYear = today.getFullYear()

      // Damien's birthday - May 17th
      const damienBirthday = new Date(currentYear, 4, 17) // Month is 0-indexed
      if (damienBirthday < today) {
        damienBirthday.setFullYear(currentYear + 1)
      }

      // Dennis's birthday - May 23rd
      const dennisBirthday = new Date(currentYear, 4, 23)
      if (dennisBirthday < today) {
        dennisBirthday.setFullYear(currentYear + 1)
      }

      const damienDiff = Math.ceil((damienBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      const dennisDiff = Math.ceil((dennisBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      setDamienDaysLeft(damienDiff)
      setDennisDaysLeft(dennisDiff)

      // Show confetti if it's one of their birthdays
      if (damienDiff === 0 || dennisDiff === 0) {
        setShowConfetti(true)
      }
    }

    calculateDaysLeft()
    // Update the countdown every day at midnight
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60 * 24)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400">
      {showConfetti && <Confetti />}

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">Birthday Celebration!</h1>
          <p className="text-xl text-white">Join us in celebrating Damien Papers and Chris Dennis Birthday!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <BirthdayCard
            name="Damien Papers"
            date="May 17th"
            daysLeft={damienDaysLeft}
            color="from-blue-500 to-cyan-400"
          />

          <BirthdayCard 
            name="Chris Dennis" 
            date="May 23rd" 
            daysLeft={dennisDaysLeft} 
            color="from-teal-500 to-green-400" 
          />
        </div>

        <VideoSection />

        <div className="mt-16 text-center">
          <button
            onClick={() => setShowConfetti(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center mx-auto"
          >
            <PartyPopper className="mr-2" />
            Celebrate Now!
          </button>
        </div>
      </div>
    </main>
  )
}