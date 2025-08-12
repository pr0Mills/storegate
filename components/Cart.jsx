'use client'
import { useProducts } from "@/context/ProductContext"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter hook

// This is the component that handles the portal logic.
// It will render its children into the DOM element with the ID "cart-portal".
const Portal = ({ children }) => {
    // We only want to create the portal on the client side, so we use state.
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // If the component is mounted on the client, create the portal.
    // We now target the new div with id="cart-portal" which is in layout.js.
    return mounted
        ? createPortal(children, document.getElementById('cart-portal'))
        : null;
}

// Component for the Cart Icon and the number badge.
const CartIcon = ({ numProducts, onOpen }) => {
    const badgeRef = useRef();

    // Effect for the "pop" animation of the number badge.
    useEffect(() => {
        if (badgeRef.current) {
            badgeRef.current.classList.add("pop")
            const timer = setTimeout(() => {
                badgeRef.current.classList.remove("pop")
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [numProducts])

    return (
        <div onClick={onOpen} style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-bag-shopping"></i>
            {numProducts > 0 && (
                <div ref={badgeRef} className="cart-num">
                    <p>{numProducts}</p>
                </div>
            )}
        </div>
    );
};

// Component for the Cart Drawer.
const CartDrawer = ({ isOpen, cart, total, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Initialize the router

    // Re-using the createCheckout logic from app/cart/page.js
    const createCheckout = async () => {
        setIsLoading(true);
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
                // Redirect the user to the Stripe checkout page
                router.push(data.url)
            }
        } catch (err) {
            console.log('Error creating checkout', err.message)
            setIsLoading(false);
        }
    };

    return (
        <Portal portalId="cart-portal">
            {/* The overlay */}
            {isOpen && <div className="cart-overlay" onClick={onClose} />}

            {/* The drawer itself */}
            <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
                <h2>Your Cart</h2>
                {Object.keys(cart).length === 0 && <p>Your cart is empty.</p>}

                {Object.keys(cart).length > 0 && (
                    <div className="drawer-headers">
                        <span>Item</span>
                        <span>Quantity</span>
                        <span>Price</span>
                    </div>
                )}

                {Object.keys(cart).map((key) => {
                    const item = cart[key]
                    return (
                        <div key={key} className="drawer-item">
                            <span>{item.name}</span>
                            <span>{item.quantity}</span>
                            <span><strong>{(item.prices[0].unit_amount / 100).toFixed(2)} CHF</strong></span>
                        </div>
                    )
                })}


                {Object.keys(cart).length > 0 && (
                    <>
                        <hr />
                        <div className="drawer-total">
                            <span><strong>Total:</strong></span>
                            <span><strong>{Object.keys(cart).length}</strong></span>
                            <span><strong>{total.toFixed(2)} CHF</strong></span>
                        </div>
                        <hr />
                        <hr />
                    </>
                )}


                <div className="drawer-actions">
                    <Link href="/cart">
                        <button onClick={onClose}>&larr; View Cart</button>
                    </Link>
                    <button onClick={createCheckout} disabled={isLoading || Object.keys(cart).length === 0}>
                        {isLoading ? 'Processing...' : 'Checkout '}
                        &rarr;
                    </button>
                </div>
            </div>
        </Portal>
    );
};

// The main Cart component that orchestrates everything.
export default function Cart() {
    const { cart } = useProducts();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // Get the current path

    const numProducts = Object.keys(cart).reduce((acc, curr) => {
        const numProduct = cart[curr].quantity;
        const sum = acc + parseInt(numProduct);
        return sum;
    }, 0);

    const total = Object.keys(cart).reduce((sum, key) => {
        return sum + cart[key].quantity * (cart[key].prices[0].unit_amount / 100);
    }, 0);

    // Disable the drawer on the /cart page
    const disableDrawer = pathname === '/cart';

    return (
        <>
            {/* The icon is always rendered and is now toggleable */}
            <CartIcon numProducts={numProducts} onOpen={() => !disableDrawer && setIsOpen(prev => !prev)} />

            {/* The drawer is only rendered if not on the /cart page and is open */}
            {!disableDrawer && (
                <CartDrawer
                    isOpen={isOpen}
                    cart={cart}
                    total={total}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
