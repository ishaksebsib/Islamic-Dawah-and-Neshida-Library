import { PlayerContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Recomended({}) {
  const [recomended, setRecomended] = useState([]);
  const { nowPlaying, setNowPlaying } = useContext(PlayerContext);
  const [isLoding, setIsLoading] = useState(true);

  // start palying when it clicked

  const changePlayer = (data) => {
    setNowPlaying(data);
  };

  // fecth post for recomended page
  const getRecomended = async () => {
    const q = query(
      collection(db, "audiostore"),
      where("rating", ">=", 4),
      limit(14)
    );
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecomended(newData);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getRecomended();
  }, []);
  return (
    <div className="bg-bgcolor dark:bg-bgdark py-8 font-roboto px-10">
      <h1 className="text-2xl mb-8">Recomended</h1>

      <div>
        <div className="grid grid-cols-2 gap-6 mobile md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap:10">
          {isLoding && <h1>Loading</h1>}
          {recomended.map((data) => (
            <div
              key={data.imgurl}
              className="  flex flex-col justify-center items-center rounded-md transition dark:hover:bg-dkcolor hover:bg-white hover:-translate-y-2 hover:cursor-pointer"
              onClick={(e) => changePlayer(data)}
            >
              <div className=" w-48 h-48 ">
                <img
                  src={data.imgurl}
                  className=" w-[100%] h-[100%] rounded-md object-cover object-center"
                />
              </div>
              <h1 className="mt-4 ">{data.title}</h1>
              <p className="my-1 max-w-48 text-sm font-light">{data.disc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
