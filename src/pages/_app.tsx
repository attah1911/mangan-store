import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Alexandria } from "next/font/google";

const alexandria = Alexandria({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={alexandria.className}>
      <Component {...pageProps} />
    </div>
  );
}
