import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Anime Reviews",
  description: "Web App to add your favorite animes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ApolloWrapper>
        <body className={inter.className}>{children}</body>
      </ApolloWrapper>
    </html>
  );
}
