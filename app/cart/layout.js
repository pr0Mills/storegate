export default function CartLayout({ children }) {
  return (
    <section className="cart-section-wrapper">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {children}
    </section>
  )
}