import { Poppins } from 'next/font/google';
import Footer from "@/components/footer";
import Header from "@/components/header";
import Nav from "@/components/nav";
import ThemeToggle from "@/components/ThemeToggle"; 
import "./globals.css"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Handcrafted Haven | Group 07</title>
        <meta name="description" content="Handcrafted Haven" />
      </head>
      <body className={poppins.className}>
        <Header/>
        <Nav/>
        <main>
          {children}
        </main>
        <ThemeToggle /> { }
        <Footer/>
      </body>
    </html>
  );
}