import React from "react";
import { faqs } from "../constants/interfaces";

export default function FAQ(props: any) {
  return (
    <div className="mx-auto px-4 lg:px-72 pb-8 bg-white">
      <div className="grid mx-auto">
        <h2 className="font-bold text-2xl mt-5 mb-8 tracking-tight">
          Frequently Asked Questions
        </h2>
        {props?.faqs?.map((faq: faqs, index: any) => (
          <div className="py-1" key={index}>
            <details className="group">
              <summary className="flex items-center font-medium cursor-pointer list-none bg-[#F5F5F5] p-2">
                <span className="transition group-open:rotate-180">
                  <svg
                    width="23"
                    height="22"
                    viewBox="0 0 23 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7001 0.057373C5.65134 0.057373 0.750488 4.95823 0.750488 11.007C0.750488 17.0558 5.65134 21.9567 11.7001 21.9567C17.7489 21.9567 22.6498 17.0558 22.6498 11.007C22.6498 4.95823 17.7489 0.057373 11.7001 0.057373ZM18.058 12.2433C18.058 12.5347 17.8196 12.7731 17.5282 12.7731H13.4662V16.8351C13.4662 17.1265 13.2278 17.3649 12.9364 17.3649H10.4639C10.1725 17.3649 9.93407 17.1265 9.93407 16.8351V12.7731H5.8721C5.5807 12.7731 5.34228 12.5347 5.34228 12.2433V9.77078C5.34228 9.47938 5.5807 9.24096 5.8721 9.24096H9.93407V5.17899C9.93407 4.88758 10.1725 4.64916 10.4639 4.64916H12.9364C13.2278 4.64916 13.4662 4.88758 13.4662 5.17899V9.24096H17.5282C17.8196 9.24096 18.058 9.47938 18.058 9.77078V12.2433Z"
                      fill="black"
                    />
                  </svg>
                </span>{" "}
                <span className="ml-4">{faq?.question}</span>
              </summary>
              <p className="text-neutral-600 mt-3 group-open:animate-fadeIn px-6">
                {faq?.answer}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
