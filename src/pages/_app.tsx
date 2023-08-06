import { type AppType } from "next/dist/shared/lib/utils";
import { Atkinson_Hyperlegible, IBM_Plex_Mono } from "next/font/google";
import "~/styles/globals.css";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-atkinson",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "700", "100", "200", "300", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex-mono",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${atkinson.variable} ${plexMono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
