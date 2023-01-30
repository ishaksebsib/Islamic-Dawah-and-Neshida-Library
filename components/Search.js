import { SearchContext } from "@/lib/context";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import * as Icon from "react-feather";

export default function Search({}) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const [result, setResult] = useState([]);
  const { seraching, setSearching } = useContext(SearchContext);

  // dark mode fuctionality

  const renderThemeChanger = () => {
    console.log(theme);
    const currentTheme = theme === "system" ? systemTheme : theme;
    console.log(theme);

    if (currentTheme === "dark") {
      return (
        <Icon.Sun
          size={20}
          className=" stroke-white  hover:stroke-warmer hover:cursor-pointer"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <Icon.Moon
          size={20}
          className=" stroke-black hover:stroke-warmer hover:cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  // search fucntionality

  const getSearch = async () => {
    setResult([]);
    let pick = "tag";
    let find = seraching;
    let method = "array-contains";
    if (seraching[0] === "@") {
      pick = "category";
      find = seraching.slice(1);
      method = "==";
    }
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
    <div>
      {/* MENU CATEGORE BAY  */}
      <div className="bg-bgcolor dark:bg-bgdark py-2 flex gap-4 items-center justify-center font-inter text-xs">
        <button
          className="bg-white dark:bg-dkcolor rounded-md px-3 py-1 "
          onClick={() => setSearching("@quran")}
        >
          Quran
        </button>
        <button
          className="bg-white dark:bg-dkcolor rounded-md px-2 py-1"
          onClick={() => setSearching("@hadis")}
        >
          Hadis
        </button>
        <button
          className="bg-white dark:bg-dkcolor rounded-md px-2 py-1"
          onClick={() => setSearching("@daewa")}
        >
          Daewa
        </button>

        <button
          className="bg-white dark:bg-dkcolor rounded-md px-2 py-1"
          onClick={() => setSearching("@neshida")}
        >
          Neshida
        </button>
        {renderThemeChanger()}
      </div>

      {isSearching && (
        <div className="bg-bgcolor dark:bg-bgdark py-8 font-roboto px-10">
          <div>
            <h1 className="flex items-center justify-center">{isLoading}</h1>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-5 lg:gap:10">
              {result.map((data) => (
                <div
                  key={data.imgurl}
                  className="  flex flex-col justify-center items-center rounded-md transition hover:bg-white dark:hover:bg-dkcolor hover:-translate-y-2 hover:cursor-pointer"
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
    </div>
  );
}
