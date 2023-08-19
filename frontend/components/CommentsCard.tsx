import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

export default function CommentsCard({ id }: any) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "reviews/coupon/" + id
      );
      setReviews(data.reviews);
    };
    fetchData();
  }, [id]);

  return (
    <div className="pt-4">
      {reviews?.map((com: any, i: number) => (
        <div
          key={i}
          className="border shadow-md m-2 rounded-lg p-2 bg-gray-100"
        >
          <div className="flex justify-between">
            <h1 className="text-sm font-bold text-black">
              {com?.user_id?.first_name} {com?.user_id?.last_name}
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
