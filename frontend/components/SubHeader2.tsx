import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function SubHeader2(props: {
  picks: string;
  popular: string;
  recently: string;
  rated: string;
  recommended: string;
}) {
  const { picks, popular, recently, rated, recommended } = props;

  const router = useRouter();
  const currentRoute = router.pathname;

  const { data: session } = useSession();

  return (
    <section className="w-[90vw] lg:w-full p-4 overflow-x-auto hide-scroll-bar">
      <div className="flex flex-grow lg:justify-center">
        {session && !currentRoute.includes("videos") && (
          <div
            className={`h-10 inline-block whitespace-nowrap px-6 rounded-full hover:bg-[#D62828] hover:text-white border-2 font-satoshi font-semibold text-center border-[#D62828] text-[#D62828] mx-2 ${
              router?.query?.q === "picks" && "bg-[#D62828] text-white"
            } py-2`}
          >
            <Link
              className="font-satoshi"
              // @ts-ignore
              href={`${picks}&token=${session?.user?.accessToken as string}`}
              scroll={false}
              as={router.asPath}
            >
              Your picks
            </Link>
          </div>
        )}
        <div
          className={`h-10 inline-block whitespace-nowrap px-6 rounded-full hover:bg-[#D62828] hover:text-white border-2 font-satoshi font-semibold text-center border-[#D62828] text-[#D62828] mx-2 ${
            router?.query?.q === "popular" && "bg-[#D62828] text-white"
          } py-2`}
        >
          <Link
            className="font-satoshi"
            href={popular}
            scroll={false}
            as={router.asPath}
          >
            {currentRoute.includes("videos") ? "Most viewed" : "Most Popular"}
          </Link>
        </div>
        <div
          className={`h-10 inline-block whitespace-nowrap px-6 rounded-full hover:bg-[#D62828] hover:text-white border-2 font-satoshi font-semibold text-center border-[#D62828] text-[#D62828] mx-2 ${
            router?.query?.q === "recently" && "bg-[#D62828] text-white"
          } py-2`}
        >
          <Link
            className="font-satoshi"
            href={recently}
            scroll={false}
            as={router.asPath}
          >
            Recently Added
          </Link>
        </div>
        <div
          className={`h-10 inline-block whitespace-nowrap px-6 rounded-full hover:bg-[#D62828] hover:text-white border-2 font-satoshi font-semibold text-center border-[#D62828] text-[#D62828] mx-2 ${
            router?.query?.q === "rated" && "bg-[#D62828] text-white"
          } py-2`}
        >
          <Link
            className="font-satoshi"
            href={rated}
            scroll={false}
            as={router.asPath}
          >
            Most rated
          </Link>
        </div>
        <div
          className={`h-10 inline-block whitespace-nowrap px-6 rounded-full hover:bg-[#D62828] hover:text-white border-2 font-satoshi font-semibold text-center border-[#D62828] text-[#D62828] mx-2 ${
            router?.query?.q === "recommended" && "bg-[#D62828] text-white"
          } py-2`}
        >
          <Link
            className="font-satoshi"
            href={recommended}
            scroll={false}
            as={router.asPath}
          >
            RG Recommended
          </Link>
        </div>
      </div>
    </section>
  );
}
