import { PlayerProvider, SearchProvider } from "@/lib/context";

import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <PlayerProvider>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
}
