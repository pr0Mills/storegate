'use client'

import { useState, useRef, useEffect } from "react"

export default function ImageBanner() {

    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        if (imgRef.current.complete) {
            setIsLoaded(true)
        }
    }, [])

    return (
        // cta means call-to-action
        <div className="banner-images">
            <img className="low-res-img" src="low_res/banner.jpeg" alt="banner-low-res" />
            <img ref={imgRef} className="high-res-img" style={{ opacity: isLoaded ? 1 : 0 }} src="med_res/banner.png" alt="banner-high-res" onLoad={() => {
                // when the high resolution image is completely loaded, this callback function will be executed and the intetion is to get is to takethis initially inbisible image, and now make it visible.
                setIsLoaded(true)
            }} />

            <div className="cta-btns-container">
                <div>
                    <div className="cta-btns-header">
                        <h3>Welcome to</h3>
                        <h1><strong>StoreGate</strong></h1>
                    </div>
                    <div>

                        <button onClick={() => document.getElementById('planner').scrollIntoView({ behavior: 'smooth' })}>
                            Shop Planner
                        </button>
                        <button onClick={() => document.getElementById('stickers').scrollIntoView({ behavior: 'smooth' })}>
                            Shop Stickers
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}