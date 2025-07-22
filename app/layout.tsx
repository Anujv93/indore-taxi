import "./globals.css";
import ReduxProvider from "@components/ReduxProvider";

export const metadata = {
  title: "Indore Taxi",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
