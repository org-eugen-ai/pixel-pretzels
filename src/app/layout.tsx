import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pixel Pretzels - Technik seit 1990",
    template: "%s | Pixel Pretzels",
  },
  description:
    "Pixel Pretzels - Ihr Online-Shop für Notebooks, Smartphones, Drucker und Zubehör. Qualität und Expertise seit 1990 aus Heilbronn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
