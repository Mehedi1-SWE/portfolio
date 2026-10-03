import type {Metadata} from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export 
const metadata:Metadata={title:"Mehedi Hasan | Software Engineer & Full-Stack Developer",description:"Professional portfolio of Mehedi Hasan.",metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL??"http://localhost:3000")};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Navbar/>{children}<Footer/></body></html>}
