import type { Metadata } from "next";
import "./globals.css";
import { ContextProvider } from "./context/Contexto";

export const metadata: Metadata = {
  title: "Clima",
  description: "Aplicacion del clima online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/imgs/icon.png" type="image/x-icon" />
      </head>
      <body className="bg-fondo bg-cover bg-center min-h-[100vh] text-white">
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
