import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function AskExpertSection() {
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSave = async (dataProps: any) => {
    if (!session) {
      return toast.error("Login before asking expert");
    }

    try {
      setloading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}faqs/`,
        {
          ...dataProps,
        },
        {
          headers: {
            "Content-Type": "application/json", // @ts-ignore
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (res?.data?.success) {
        toast.success("Request sent successfully");
        reset();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="mx-auto px-4 lg:px-72 py-8 bg-white">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 ">
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col w-full items-center justify-center lg:flex-row sm:space-y-0"
        >
          <input
            type="text"
            className="bg-[#F5F5F5] w-[80%] rounded-md border-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#003049] disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Find your question"
            {...register("question", { required: true })}
          />
          <button
            type="submit"
            className="rounded-md mt-4 lg:rounded-full border border-[#003049] uppercase bg-[#003049] py-2 px-6 text-white transition hover:border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-[#003049] focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[#003049] disabled:hover:bg-[#003049] sm:max-w-max"
          >
            {loading ? "Asking..." : "Ask Our Expert"}
          </button>
        </form>
      </div>
    </div>
  );
}
