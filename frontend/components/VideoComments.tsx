import React, { useEffect, useState } from "react";
import { fetcher } from "../helpers/fetcher";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";

export default function VideoComments({ id }: any): JSX.Element {
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "comments/all/" + id
      );
      setcomments(data.comments);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {comments?.map((com: any, i: number) => (
        <div
          key={i}
          className="border shadow-md m-2 rounded-lg p-2 bg-gray-100"
        >
          <div className="flex justify-between">
            <h1 className="text-sm font-bold text-black">
              {com?.user?.first_name} {com?.user?.last_name}
            </h1>
            <span className="text-xs text-gray-400">
              {moment(com?.createdAt).fromNow()}
            </span>
          </div>
          <div className="text-sm text-gray-600">{com?.comment} </div>
        </div>
      ))}
    </div>
  );
}
