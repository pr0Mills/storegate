export default function ContactPage() {
  return (
    <div>
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us.</p>
      <form action="mailto:your@email.com" method="post" encType="text/plain">
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="message">Message:</label><br />
        <textarea id="message" name="message" rows="5" required></textarea><br /><br />

        <button type="submit">Send</button>
      </form>
    </div>
  )
}