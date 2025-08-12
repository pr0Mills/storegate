'use client'

import { useEffect } from 'react'
import Link from "next/link"
import confetti from 'canvas-confetti'

export default function SuccessPage() {

    useEffect(() => {
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)
    }, [])

    return (
        <div className="page-container" style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 className="text-large">Thank you for your purchase 🎉</h2>
            <Link href={'./'}>
                <button>Continue &rarr;</button>
            </Link>
        </div>
    )
}
