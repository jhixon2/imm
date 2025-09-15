import './globals.css';
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: 'Isabel Monika Marchand',
  description: 'IMM Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ebGaramond.className}>
        {children}
      </body>
    </html>
  );
}