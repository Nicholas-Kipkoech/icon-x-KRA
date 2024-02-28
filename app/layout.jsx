import { Inter } from "next/font/google";
import "./globals.css";
import { ContextProvider, ToastProvider } from "./providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ICON Tax",
  description: "ETIMS fully intergrated software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <ToastProvider>{children}</ToastProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
