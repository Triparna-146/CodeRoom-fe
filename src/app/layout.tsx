import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { 
  inter, 
  sora, 
  firaCode, 
  poppins, 
  spaceGrotesk 
} from '@/lib/fonts'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CodeRoom",
  description: "Real-Time Collaborative Interview Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      className={`
        ${inter.variable} 
        ${sora.variable} 
        ${firaCode.variable} 
        ${poppins.variable} 
        ${spaceGrotesk.variable}
      `}
      suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >{children}
        </ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
