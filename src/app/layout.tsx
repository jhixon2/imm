import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}