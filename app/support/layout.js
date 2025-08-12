export default function SupportLayout({ children }) {
  return (
    <section className="support-section" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Support</h1>
      {children}
    </section>
  )
}