import Footer from "@/components/footer";
import Header from "@/components/header";
import Nav from "@/components/nav";
   
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Handcrafted Heaven | Group07</title>
      </head>
      <body>
      <Header/>
      <Nav/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
