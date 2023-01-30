import { PlayerContext } from "@/lib/context";
import { useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Player({}) {
  const { nowPlaying, setNowPlaying } = useContext(PlayerContext);

  return (
    <>
      {" "}
      {nowPlaying && (
        <div className=" bg-white fixed bottom-0 w-[100%] flex ">
          <div className="w-24 h-24">
            <img
              src={nowPlaying.imgurl}
              className=" w-[100%] h-[100%]  object-cover object-center"
            />
          </div>

          <AudioPlayer
            autoPlay
            src={nowPlaying.link}
            onPlay={(e) => console.log("onPlay")}
            className="dark:bg-black"
          />
        </div>
      )}{" "}
    </>
  );
}
