import { PlayerProvider, SearchProvider } from "@/lib/context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </PlayerProvider>
  );
}
