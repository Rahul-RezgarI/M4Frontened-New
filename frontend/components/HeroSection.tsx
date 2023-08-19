import Image from "next/image";
import React from "react";
import bgImg from "../assets/bgs/bg.svg";

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <Image src={bgImg} alt="" className="w-screen" />
    </section>
  );
}
