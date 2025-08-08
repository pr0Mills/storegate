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
                <h3>prOMills</h3>
                <Link>GitHub</Link>
              </div>
            </div>

            <div className="socials"></div>
          </footer>
        </div>
      </body>
    </html>
  );
}

