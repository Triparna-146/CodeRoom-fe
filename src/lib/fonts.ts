import { 
  Inter, 
  Sora, 
  Fira_Code, 
  Poppins, 
  Space_Grotesk 
} from 'next/font/google';

// Main body text
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Headings and CTAs
export const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Code blocks and consoles
export const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

// Buttons and sections
export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
});

// Hero section titles
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});
