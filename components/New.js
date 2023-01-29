import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
export default function New({}) {
  const [newAudio, setNewAudio] = useState([]);
  const { nowPlaying, setNowPlaying } = useContext(PlayerContext);
  const [isLoding, setIsLoading] = useState(true);

  // start palying when it clicked

  const changePlayer = (data) => {
    setNowPlaying(data);
  };

  // fecth post for newAudio page
  const getnewAudio = async () => {
    const q = query(
      collection(db, "audiostore"),
      where("rating", "==", 5),
      orderBy("createdAt"),
      limit(14)
    );
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNewAudio(newData);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getnewAudio();
  }, []);
  return (
    <div className="bg-bgcolor py-8 font-roboto px-10">
      <h1 className="text-2xl mb-8">New Releases</h1>
      <div>
        <div className="grid grid-cols-2 gap-6">
          {isLoding && <h1>Loading</h1>}
          {newAudio.map((data) => (
            <div
              key={data.imgurl}
              className="  flex flex-col justify-center items-center rounded-md transition hover:bg-white hover:-translate-y-2 hover:cursor-pointer"
              onClick={(e) => changePlayer(data)}
            >
              <div className=" w-48 h-48 ">
                <img
                  src={data.imgurl}
                  className=" w-[100%] h-[100%] rounded-md object-cover object-center"
                />
              </div>
              <h1 className="mt-4 ">{data.title}</h1>
              <p className="mt-1 max-w-48 text-sm font-light">{data.disc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}