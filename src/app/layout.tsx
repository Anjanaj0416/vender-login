import type { Metadata } from "next";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "TradeZ - The Future Marketplace",
  description: "Vendor Product Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
