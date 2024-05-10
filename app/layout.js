import "./globals.css";
import NavBar from "@/components/NavBar";
import Provider from "@/components/Provider";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Prompt Genius",
  description: "Prompt Genius is a tool for generating writing prompts.",
};

export default function RootLayout({children}) {
  return (
    <SessionProvider>
    <html>
     <body>
      <div className="main">
        <div className="gradient">
        </div>
      </div>

      <main className="app">
        
        <NavBar />
        {children}
      </main>
      <Provider></Provider>
     </body>
    </html>
    </SessionProvider>
  );
}
