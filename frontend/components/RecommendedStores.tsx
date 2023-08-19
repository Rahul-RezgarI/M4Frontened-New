import Image from "next/image";
import Link from "next/link";
import message from "../assets/stores/pizza.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecommendedStores() {
  const [stores, setstores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "store/recommended"
      );
      setstores(data.stores);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <h1 className="my-5 font-montserrat text-[20px] font-bold">
        Recommended Stores
      </h1>
      <div className="overflow-x-scroll hide-scroll-bar">
        <section className="flex w-full gap-2 flex-grow justify-between px-2 py-4 lg:px-8 lg:py-3 min-w-max rounded-full mx-2">
          <div className="flex gap-20 w-full">
            {stores?.map((store: any, i: number) => (
              <Link
                key={i}
                href={"/store/" + store?.slug}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={store?.icon}
                  alt=""
                  className="h-[60px] w-[60px] m-auto"
                  width={100}
                  height={100}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
