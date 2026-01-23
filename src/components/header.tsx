import Image from "next/image"

export default function Header() {
    return (
        <header>
            <div>
                <Image src="/handcraftedlogo.webp" alt="logo" width={200}height={200}></Image>    
                <h1>Group 07</h1>
            </div>
            <div>
                <button>Login</button>
                <button>Signup</button>
            </div>
        </header>
    )
}