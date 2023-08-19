import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SubHeader(props: {
  offers: any;
  videos: string;
  mustread: string;
  reviews: string;
}) {
  const router = useRouter();

  const currentRoute = router.pathname;

  const [tab, setTab] = useState("Offer");

  return (
    <section className="flex bg-[#F77F00] h-16 justify-between items-center px-2 py-1 lg:px-8 lg:py-3 w-full lg:min-w-max rounded-full mx-4">
      <div
        onClick={() => props?.offers()}
        className={
          currentRoute.includes("store") || currentRoute.includes("category")
            ? "rounded-full h-10 text-[#F77F00] bg-white flex items-center justify-center py-2 px-4"
            : "flex justify-center cursor-pointer h-10 lg:h-16 px-4 text-white focus:outline-none items-center transition-all duration-500 ease-in-out"
        }
      >
        <div
          className="text-xs font-bold cursor-pointer"
          // onClick={() => props?.offers}
          // href={"/" + props?.offers?.toString()}
        >
          Offers
        </div>
      </div>
      <div
        // onClick={() => setTab("Video")}
        className={
          currentRoute.includes("videos")
            ? "rounded-full h-10 text-[#F77F00] bg-white flex items-center justify-center py-2 px-4"
            : "flex justify-center cursor-pointer h-10 lg:h-16 px-4 text-white focus:outline-none items-center transition-all duration-500 ease-in-out"
        }
      >
        <Link
          className="text-xs font-bold"
          href={"/" + props?.videos?.toString()}
        >
          Videos
        </Link>
      </div>
      <div
        // onClick={() => setTab("MustRead")}
        className={
          currentRoute.includes("must-read")
            ? "rounded-full h-10 text-[#F77F00] bg-white flex items-center justify-center py-2 px-2 pointer-events-none"
            : "flex justify-center cursor-pointer h-10 lg:h-16 px-2 text-white focus:outline-none items-center pointer-events-none transition-all duration-500 ease-in-out"
        }
      >
        <Link
          className="text-xs font-bold whitespace-nowrap pointer-events-none"
          href={"/" + props?.mustread?.toString()}
        >
          Must Read
        </Link>
      </div>
      <div
        // onClick={() => setTab("Reviews")}
        className={
          currentRoute.includes("reviews")
            ? "rounded-full h-10 text-[#F77F00] bg-white flex items-center justify-center py-2 px-4"
            : "flex justify-center cursor-pointer h-10 lg:h-16 px-4 text-white focus:outline-none items-center transition-all duration-500 ease-in-out"
        }
      >
        <Link className="text-xs font-bold" href={"/" + props?.reviews}>
          Reviews
        </Link>
      </div>
    </section>
  );
}
