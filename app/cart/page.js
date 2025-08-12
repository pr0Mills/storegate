'use client'

import { useProducts } from "@/context/ProductContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function CartPage() {
    const router = useRouter()
    const { cart, handleIncrementProduct } = useProducts()

    const [removedItem, setRemovedItem] = useState(null)
    const [showUndo, setShowUndo] = useState(false)

    async function createCheckout() {
        try {
            const baseURL = process.env.NEXT_PUBLIC_BASE_URL
            const lineItems = Object.keys(cart).map((item) => {
                return {
                    price: item,
                    quantity: cart[item].quantity
                }
            })

            const response = await fetch(baseURL + '/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ lineItems })
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data)
                router.push(data.url)
            }
        } catch (err) {
            console.log('Error creating checkout', err.message)
        }
    }

    function handleRemove(itemData) {
        setRemovedItem(itemData)
        setShowUndo(true)
        handleIncrementProduct(itemData.default_price, 0, itemData, true)
    }

    function undoRemove() {
        if (removedItem) {
            handleIncrementProduct(removedItem.default_price, removedItem.quantity, removedItem, true)
            setRemovedItem(null)
            setShowUndo(false)
        }
    }

    useEffect(() => {
        if (showUndo) {
            const timer = setTimeout(() => {
                setShowUndo(false)
                setRemovedItem(null)
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [showUndo])

    return (
        <section className="cart-section">

            <div
                style={{
                    position: "fixed",
                    top: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "black",
                    padding: "12px 20px",
                    borderRadius: "4px",
                    opacity: showUndo ? 1 : 0,
                    transition: "opacity 0.5s ease",
                    pointerEvents: showUndo ? "auto" : "none",
                    zIndex: 1000,
                }}
            >
                {removedItem?.name} has been removed
                <button
                    onClick={undoRemove}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#4CAF50",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    Undo
                </button>
            </div>

            {Object.keys(cart).length === 0 && (<p>You have no items in your cart!</p>)}
            <div className="cart-container">
                {Object.keys(cart).map((item, itemIndex) => {
                    const itemData = cart[item]
                    const itemQuantity = itemData?.quantity

                    const imgName = itemData.name === 'Medieval Dragon Month Planner'
                        ? 'planner' :
                        itemData.name.replaceAll(' Sticker.png', '').replaceAll(' ', '_')

                    const imgUrl = 'low_res/' + imgName + '.jpeg'

                    return (
                        <div key={itemIndex} className="cart-item">
                            <img src={imgUrl} alt={imgName + '-img'} />
                            <div className="cart-item-info">
                                <h3>{itemData.name}</h3>
                                <div className="cart-actions">
                                    <h3>${itemData.prices[0].unit_amount / 100}</h3>
                                    <div className="quantity-container">
                                        <p><strong>Quantity</strong></p>
                                        <input
                                            type="number"
                                            min={1}
                                            value={itemQuantity}
                                            onChange={(event) => {
                                                let newValue = parseInt(event.target.value) || 1
                                                if (newValue < 1) newValue = 1
                                                handleIncrementProduct(itemData.default_price, newValue, itemData, true)
                                            }}
                                        />
                                        <button className="remove-btn" onClick={() => handleRemove(itemData)}>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="checkout-container">
                <Link href={'/'}>
                    <button>&larr; Continue shopping</button>
                </Link>
                {Object.keys(cart).length > 0 && (
                    <button onClick={createCheckout}>Checkout &rarr;</button>
                )}
            </div>
        </section>
    )
}
