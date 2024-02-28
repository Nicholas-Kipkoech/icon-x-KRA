import { Inter } from "next/font/google";
import "./globals.css";

import ToastProvider from "./hooks/ToastProvider";
import { ContextProvider } from "./context/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ICON Tax",
  description: "ETIMS fully intergrated software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
