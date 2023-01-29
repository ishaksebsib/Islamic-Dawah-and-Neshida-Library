import { SearchContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import * as Icon from "react-feather";

export default function Search({}) {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [result, setResult] = useState([]);
  const { seraching, setSearching } = useContext(SearchContext);

  const getSearch = async () => {
    let pick = "tag";
    let find = seraching;
    let method = "array-contains";
    if (seraching[0] === "@") {
      pick = "category";
      find = seraching.slice(1);
      method = "==";
    }
    console.log("searchinggg", seraching[0]);
    console.log(pick);
    const q = query(
      collection(db, "audiostore"),
      where(pick, method, find),
      limit(14)
    );
    setIsLoading("Loading");
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setResult(newData);
      if (newData.length > 0) {
        setIsLoading("");
      } else {
        setIsLoading("Not Found");
      }
    });
    if (seraching.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    getSearch();
    if (result.length > 0) {
    }
  }, [seraching]);
  return (
    <>
      {/* MENU CATEGORE BAY  */}
      <div className="bg-bgcolor py-2 flex gap-4 items-center justify-center font-inter text-xs">
        <button
          className="bg-white rounded-md px-3 py-1 "
          onClick={() => setSearching("@quran")}
        >
          Quran
        </button>
        <button
          className="bg-white rounded-md px-2 py-1"
          onClick={() => setSearching("@hadis")}
        >
          Hadis
        </button>
        <button
          className="bg-white rounded-md px-2 py-1"
          onClick={() => setSearching("@daewa")}
        >
          Daewa
        </button>

        <button
          className="bg-white rounded-md px-2 py-1"
          onClick={() => setSearching("@neshida")}
        >
          Neshida
        </button>

        <Icon.Moon size={20} className=" stroke-black  " />
      </div>

      {isSearching && (
        <div className="bg-bgcolor py-8 font-roboto px-10">
          <div>
            <div className="grid grid-cols-2 gap-6">
              <h1>{isLoading}</h1>
              {result.map((data) => (
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
                  <p className="mt-1 max-w-48 text-sm font-light">
                    {data.disc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
