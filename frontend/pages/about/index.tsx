import React from "react";
import mic from "../../assets/designs/h2_bg.png";
import banner from "../../assets/designs/banner1.jpg";
import wwr from "../../assets/designs/wwr.png";
import mv1 from "../../assets/designs/mv1.jpg";
import mv2 from "../../assets/designs/mv2.png";
import mv3 from "../../assets/designs/mv3.png";
import icon1 from "../../assets/designs/icon1.jpg";
import icon2 from "../../assets/designs/icon2.jpg";
import icon3 from "../../assets/designs/icon3.jpg";
import icon4 from "../../assets/designs/icon4.jpg";
import icon5 from "../../assets/designs/icon5.jpg";
import icon6 from "../../assets/designs/icon6.jpg";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactUs from "../../components/ContactUs";

export default function About() {
  return (
    <>
      <Header />
      <div className="bg-white pt-4">
        <div className="px-4 lg:px-40">
          <Image src={banner} alt="" className="w-screen rounded-3xl" />
        </div>

        <div className="px-4 lg:px-40 my-10">
          <div className=" rounded-3xl bg-gray-200 p-4">
            <div className="col-md-12">
              <div className="block lg:flex">
                <Image src={wwr} alt="" className="w-screen rounded-3xl" />
                <div className="service_desc_right2 wow slideInRight">
                  <h3 className="text-3xl underline font-extrabold my-4">
                    <span>Who are We?</span>
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-60 my-10 bg-yellow-500 py-10">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-3xl font-extrabold my-4 text-center">
                Why Choose Us
              </h3>
              <div className="why_text">
                <p>
                  Plusieurs variations de Lorem Ipsum peuvent être trouvées ici
                  ou là, mais la majeure partie d'entre elles a été altérée par
                  l'addition d'humour ou de mots aléatoires qui ne ressemblent
                  pas une seconde à du texte standard. Si vous voulez utiliser
                  un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a
                  rien d'embarrassant caché dans le texte. Tous les générateurs
                  de Lorem Ipsum sur Internet tendent à reproduire le même
                  extrait sans fin, ce qui fait de lipsum.com le seul vrai
                  générateur de Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:grid grid-cols-2 gap-12 my-6">
            <div className="relative">
              <Image
                src={mv2}
                alt=""
                className="hidden lg:block w-30 rounded-full border-2 border-white absolute top-8 -right-10"
              />
              <Image
                src={mv3}
                alt=""
                className="hidden lg:block w-30  rounded-full border-2 border-white absolute bottom-8 -right-10"
              />
              <Image src={mv1} alt="" className="border-2 border-white" />
            </div>

            <div className="flex flex-col justify-between">
              <div className="my-6">
                <h5 className="bg-white max-w-fit px-3 rounded-full text-xl">
                  <span>Our Mission</span>
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>

              <div className="v_block_right">
                <h5 className="bg-white max-w-fit px-3 rounded-full text-xl">
                  <span>Our Values</span>
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>

        <div className="w-full px-4 lg:px-60">
          <div className=" flex flex-col items-center">
            <div className="row">
              <h2 className="text-2xl font-bold my-4 text-center">
                <span>
                  Stay In The <span>Loop</span>
                </span>
              </h2>
              <Image
                src={mic}
                alt=""
                className="border-2 border-white mx-auto"
              />
            </div>
          </div>

          <p className="mx-auto text-center">
            Subscribe To Our Newsletter To Receive Updates On New Deals & Promos
          </p>
          <form className="w-full mx-auto py-8 flex flex-col justify-center items-center">
            <input
              type="text"
              className="border border-black w-1/2 my-6 p-2 mx-auto"
              name="email"
              id="email"
              placeholder="Enter your Email"
            />

            <button className="bg-red-700 rounded-full p-2 px-3 text-white">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      <div className="icon-bar2 fixed right-2 top-1/3">
        <a href="#">
          <Image src={icon1} alt="" className="border-2 border-white mx-auto" />
        </a>
        <a href="#">
          <Image src={icon2} alt="" className="border-2 border-white mx-auto" />
        </a>
        <a href="#">
          <Image src={icon3} alt="" className="border-2 border-white mx-auto" />
        </a>
        <a href="#">
          <Image src={icon4} alt="" className="border-2 border-white mx-auto" />
        </a>
        <a href="#">
          <Image src={icon5} alt="" className="border-2 border-white mx-auto" />
        </a>
        <a href="#">
          <Image src={icon6} alt="" className="border-2 border-white mx-auto" />
        </a>
      </div>

      <ContactUs />
      <Footer />
    </>
  );
}
