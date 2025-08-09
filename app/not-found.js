import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <h2>Page not found :(</h2>
            <Link href={'./'}>
                <button>Home</button>
            </Link>
        </div>
    )
}