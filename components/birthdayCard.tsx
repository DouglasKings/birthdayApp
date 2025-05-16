import { Calendar, Gift } from "lucide-react"

interface BirthdayCardProps {
  name: string
  date: string
  daysLeft: number
  color: string
}

export default function BirthdayCard({ name, date, daysLeft, color }: BirthdayCardProps) {
  return (
    <div
      className={`rounded-xl p-6 shadow-lg bg-gradient-to-r ${color} transform hover:scale-105 transition-all duration-300`}
    >
      <div className="flex flex-col items-center text-white">
        <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center mb-4">
          <Gift size={48} />
        </div>

        <h2 className="text-3xl font-bold mb-2">{name}</h2>

        <div className="flex items-center mb-4">
          <Calendar className="mr-2" />
          <span className="text-xl">{date}</span>
        </div>

        <div className="text-center">
          {daysLeft === 0 ? (
            <div className="text-2xl font-bold animate-pulse">Today is the big day! 🎉</div>
          ) : (
            <div>
              <div className="text-5xl font-bold mb-2">{daysLeft}</div>
              <div className="text-lg">days until the celebration!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}