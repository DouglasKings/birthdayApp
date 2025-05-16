"use client"

import { useEffect, useRef } from "react"

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Safely set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Define the Particle class
    class Particle {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      gravity: number
      canvasWidth: number
      canvasHeight: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.x = Math.random() * this.canvasWidth
        this.y = Math.random() * this.canvasHeight - this.canvasHeight
        this.size = Math.random() * 15 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 2 + 1
        this.gravity = 0.1
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX
        this.speedY += this.gravity

        if (this.y > this.canvasHeight) {
          this.y = -this.size
          this.speedY = Math.random() * 2 + 1
          this.x = Math.random() * this.canvasWidth
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.closePath()
        context.fill()
      }
    }

    const particleCount = 200
    const colors = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
    ]

    // Create an array to hold our particles
    const particles: Particle[] = []

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Update particles with new canvas dimensions
      particles.forEach((particle) => {
        particle.canvasWidth = canvas.width
        particle.canvasHeight = canvas.height
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
}
