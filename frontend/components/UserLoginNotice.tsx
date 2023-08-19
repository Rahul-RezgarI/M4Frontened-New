import Link from "next/link";
import React from "react";

export default function UserLoginNotice() {
  return (
    <div>
      <div>
        <div className="text-center flex flex-col p-4 md:text-left md:flex-row md:items-center md:justify-between md:p-4 bg-blue-50 rounded-md">
          <div>
            <div className="text-gray-900">
              <i className="ri-error-warning-line text-yellow-700 text-3xl"></i>
              In other for you to review or comment,
            </div>
            <Link href={"/auth/signup"} className="text-blue-500">
              Register
            </Link>
          </div>

          <div className="mt-3 md:mt-0 md:ml-2">
            <Link
              href={"/auth/login"}
              className="inline-block rounded-full underline py-2 px-4 text-white bg-gray-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
