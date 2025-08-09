import "./globals.css";
import "./fanta.css";
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart"
import EmailInput from "@/components/EmailInput";

export const metadata = {
  title: "StoreGate",
  description: "A super cool store for programers and productivity fiends!"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <div id="portal" />
        <div id="app">
          <header>
            <div className="header-content">
              <Link href={'/'}>
                <h1>StoreGate</h1>
              </Link>
              
              <h5 className="mid-text">- Cool stuff for cool people!</h5>
              <Cart/>
            </div>
          </header>

          <main>
            {children}
          </main>

          <div className="hr" />

          <footer>
            <div className="email-container">
              <h5>
                Get a sneak peak at new additions to the store, special offers,
                and so much more.
              </h5>
              <EmailInput />
            </div>

            <div className="links-container">
              <div>
                <h3>pr0Mills</h3>
                <Link href={'./'}>GitHub</Link>
              </div>
              <div>
                <h3>Store</h3>
                <Link href={'./'}>Home</Link>
                <Link href={'./cart'}>Cart</Link>
              </div>
              <div>
                <h3>Support</h3>
                <Link href={'./contact'}>Contact</Link>
                <Link href={'./faq'}>FAQ</Link>
                <Link href={'./chat'}>Chat</Link>
              </div>
            </div>

            <div className="socials">
              <p>© <a href="https://www.promills.com" target="_blank">pr0Mills</a> 2025<br/>
              Built with NextJS & <a href="https://www.fantacss.smoljames.com" target="_blank">
              FantaCSS</a> 🔥</p>
              <div className="socal-links">
                <Link href={'https://github.com/pr0Mills'} target="_blank"><i className="fa-brands fa-github"></i></Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

