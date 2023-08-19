import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSidebarContext } from "../context/toggle.context";
import { useRouter } from "next/router";

function LeftSideBar(props: any) {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const router = useRouter();

  const currentPath = router.asPath;

  const [tags, setTags] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [subcategory, setSubCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const [subcategories, tags] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}subcategory`).then((res) =>
            res.json()
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}tag`).then((res) =>
            res.json()
          ),
        ]);

        setSubCategories(subcategories?.subcategories);
        setTags(tags?.tag);
      } catch (error) {}
    };
    fetcher();
  }, []);

  useEffect(() => {
    if (selectedTags.length > 0 || subcategory !== "") {
      if (router.asPath.includes("?")) {
        router.push(
          `${router.asPath}&tags=${JSON.stringify(
            selectedTags.length > 0 ? selectedTags : ""
          )}&subcategory=${subcategory ? subcategory : ""}`,
          router.asPath
        );
      } else {
        router.push(
          `${router.asPath}?tags=${JSON.stringify(
            selectedTags.length > 0 ? selectedTags : ""
          )}&subcategory=${subcategory ? subcategory : ""}`,
          router.asPath
        );
      }
    }
  }, [selectedTags, subcategory]);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagId = e.target.value;
    if (e.target.checked) {
      // @ts-ignore
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
    }
    // handleFilter();
  };

  return (
    <>
      <aside className="sticky top-16 w-[300px] pb-20 bg-[#D62828] min-h-full h-screen hidden lg:flex overflow-auto hide-scroll-bar">
        <div
          className={`flex flex-col p-6 space-y-8 pb-40 overflow-auto hide-scroll-bar`}
        >
          {(currentPath.includes("store") ||
            currentPath.includes("category")) && (
            <>
              <div className="text-white">
                <div className="flex justify-between">
                  <h1 className="font-bold">Sub-categories</h1>
                </div>

                <hr />
                <>
                  {subcategories?.map((subcategory: any, i: number) => (
                    <div
                      key={subcategory?._id}
                      className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm cursor-pointer"
                    >
                      <div className="w-full flex items-center gap-x-1.5 group select-none">
                        <div className="w-1 rounded-xl h-8 bg-transparent transition-colors  transition-transform ease-in-out transform hover:scale-110 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                        </div>
                        <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all  transition-transform ease-in-out transform hover:scale-110 text-sm">
                          <input
                            type="radio"
                            name="subcategory"
                            id={subcategory?._id}
                            value={subcategory?._id}
                            onChange={(e) => setSubCategory(e.target.value)}
                          />
                          <label
                            htmlFor={subcategory?._id}
                            // onClick={handleFilter}
                            className="font-QuicksandMedium"
                          >
                            {subcategory?.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              </div>

              <div className="text-white">
                <div className="flex justify-between">
                  <h1 className="font-bold">Tags</h1>
                </div>
                <hr />
                {tags?.map((tag: any, i: number) => (
                  <div
                    key={tag?._id}
                    className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm cursor-pointer"
                  >
                    <div className="w-full flex items-center gap-x-1.5 group select-none">
                      <div className="w-1 rounded-xl h-8 bg-transparent transition-colors  transition-transform ease-in-out transform hover:scale-110 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                      </div>
                      <div
                        // href={`${router.asPath}?tags=${tag?._id}`}
                        className="text-white group-hover:bg-white/10  cursor-pointer w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all  transition-transform ease-in-out transform hover:scale-110 text-sm"
                      >
                        <input
                          type="checkbox"
                          name="tags"
                          id={tag?._id}
                          value={tag?._id}
                          onChange={handleTagChange}
                        />
                        <label
                          htmlFor={tag?._id}
                          // onClick={handleFilter}
                          className="font-QuicksandMedium  cursor-pointer"
                        >
                          {tag?.name}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-white">
            <h1 className="font-bold px-4">Most Popular Stores</h1>
            <hr />
            <div className="mx-auto flex justify-center items-center flex-col w-full overflow-y-scroll  hide-scroll-bar">
              {props?.popularStores?.map((store: any) => (
                <Link
                  href={"/store/" + store?.slug}
                  key={store?._id}
                  className="w-[172px] overflow-hidden bg-white rounded-full shadow-md  transition-transform ease-in-out transform hover:scale-110 hover:shadow-xl flex items-center py-1 my-1 px-3"
                >
                  <Image
                    src={store?.icon}
                    alt="plant"
                    className="h-6 w-6"
                    height={100}
                    width={100}
                  />
                  <span className="text-black text-xs truncate ml-4 font-extrabold">
                    {store?.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {props?.stores && props?.stores?.length > 0 && (
            <div className="text-white w-full text-center">
              <h1 className="font-bold px-4">Related stores</h1>
              <hr />

              <div className="mx-auto flex justify-center items-center flex-col w-full overflow-y-scroll  hide-scroll-bar">
                {props?.stores?.map((store: any) => (
                  <Link
                    href={"/store/" + store?.slug}
                    key={store?._id}
                    className="w-[172px] overflow-hidden bg-white rounded-full shadow-md  transition-transform ease-in-out transform hover:scale-110 hover:shadow-xl flex items-center py-1 my-1 px-3"
                  >
                    <Image
                      src={store?.icon}
                      alt="plant"
                      className="h-6 w-6"
                      height={100}
                      width={100}
                    />{" "}
                    <span className="text-black text-xs truncate ml-4 font-extrabold">
                      {store?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
      {isSidebarOpen && (
        <aside
          onClick={toggleSidebar}
          className="fixed z-30 top-16 w-[300px] bg-[#D62828] min-h-full h-screen overflow-x-auto hide-scroll-bar"
        >
          <div
            className={`flex flex-col p-6 space-y-8 pb-40 overflow-auto hide-scroll-bar`}
          >
            {(currentPath.includes("store") ||
              currentPath.includes("category")) && (
              <>
                <div className="text-white">
                  <div className="flex justify-between">
                    <h1 className="font-bold">Sub-categories</h1>
                  </div>

                  <hr />
                  {subcategories?.map((subcategory: any, i: number) => (
                    <Link
                      key={subcategory?._id}
                      href={"/"}
                      className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
                    >
                      <div className="w-full flex items-center gap-x-1.5 group select-none">
                        <div className="w-1 rounded-xl h-8 bg-transparent transition-colors  transition-transform ease-in-out transform hover:scale-110 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                        </div>
                        <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all  transition-transform ease-in-out transform hover:scale-110 text-sm">
                          <input
                            type="checkbox"
                            name="subcategorys"
                            id={subcategory?._id}
                          />
                          <label
                            htmlFor={subcategory?._id}
                            className="font-QuicksandMedium cursor-pointer"
                          >
                            {subcategory?.name}
                          </label>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="text-white">
                  <div className="flex justify-between">
                    <h1 className="font-bold">Tags</h1>
                  </div>

                  <hr />
                  {tags?.map((tag: any, i: number) => (
                    <Link
                      key={tag?._id}
                      href={"/"}
                      className="w-full pr-3 flex flex-col gap-y-1 text-gray-500 fill-gray-500 text-sm"
                    >
                      <div className="w-full flex items-center gap-x-1.5 group select-none">
                        <div className="w-1 rounded-xl h-8 bg-transparent transition-colors  transition-transform ease-in-out transform hover:scale-110 relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full h-[102%] group-hover:translate-y-0 translate-y-0 bg-red-600 transition-all duration-300"></div>
                        </div>
                        <div className="text-white group-hover:bg-white/10 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all  transition-transform ease-in-out transform hover:scale-110 text-sm">
                          <input type="checkbox" name="tags" id={tag?._id} />
                          <label
                            htmlFor={tag?._id}
                            className="font-QuicksandMedium cursor-pointer"
                          >
                            {tag?.name}
                          </label>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            <div className="text-white w-full text-center px-4">
              <h1 className="font-bold">Most Popular Stores</h1>
              <hr />
              <div className="mx-auto flex justify-center items-center flex-col w-full overflow-y-scroll  hide-scroll-bar">
                {props?.popularStores?.map((store: any) => (
                  <Link
                    href={"/store/" + store?.slug}
                    key={store?._id}
                    className="w-[172px] rounded-full overflow-hidden bg-white shadow-md  transition-transform ease-in-out transform hover:scale-110 hover:shadow-xl flex items-center py-1 my-1 px-3"
                  >
                    <Image
                      src={store?.icon}
                      alt="plant"
                      className="h-6 w-6"
                      height={100}
                      width={100}
                    />{" "}
                    <span className="text-black text-xs truncate ml-4 font-extrabold">
                      {store?.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {props?.stores && props?.stores?.length > 0 && (
              <div className="text-white w-full text-center px-4">
                <h1 className="font-bold">Related stores</h1>
                <hr />

                <div className="mx-auto flex justify-center items-center flex-col w-full overflow-y-scroll  hide-scroll-bar">
                  {props?.stores?.map((store: any) => (
                    <Link
                      href={"/store/" + store?.slug}
                      key={store?._id}
                      className="w-[172px] rounded-full overflow-hidden bg-white shadow-md  transition-transform ease-in-out transform hover:scale-110 hover:shadow-xl flex items-center py-1 my-1 px-3"
                    >
                      <Image
                        src={store?.icon}
                        alt="plant"
                        className="h-6 w-6"
                        height={100}
                        width={100}
                      />{" "}
                      <span className="text-black text-xs truncate ml-4 font-extrabold">
                        {store?.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}

export default LeftSideBar;
