import { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [nowPlaying, setNowPlaying] = useState(null);
  const value = { nowPlaying, setNowPlaying };
  return (
    <PlayerContext.Provider value={value}> {children}</PlayerContext.Provider>
  );
}

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [seraching, setSearching] = useState("");
  const value = { seraching, setSearching };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
