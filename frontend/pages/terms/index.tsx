import React from "react";
import mic from "../../assets/designs/h2_bg.png";
import icon1 from "../../assets/designs/icon1.jpg";
import icon2 from "../../assets/designs/icon2.jpg";
import icon3 from "../../assets/designs/icon3.jpg";
import icon4 from "../../assets/designs/icon4.jpg";
import icon5 from "../../assets/designs/icon5.jpg";
import icon6 from "../../assets/designs/icon6.jpg";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./terms.module.css";
import { clsx } from "clsx";
import ContactUs from "../../components/ContactUs";

export default function About() {
  return (
    <>
      <Header />
      <div className="bg-white pt-4">
        <div className="px-4 lg:px-60">
          <div className="row">
            <h4 className="text-red-700 my-6">TERMS & CONDITIONS</h4>

            <h5 className={clsx(styles.h5)}>
              1. Plusieurs variations de Lorem Ipsum peuvent être trouvées
            </h5>

            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.
            </p>

            <p>
              Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard. Si vous voulez utiliser un
              passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien
              d'embarrassant caché dans le texte. Tous les générateurs de Lorem
              Ipsum sur Internet tendent à reproduire le même extrait sans fin,
              ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum.
              Iil utilise un dictionnaire de plus de 200 mots latins, en
              combinaison de plusieurs structures de phrases, pour générer un
              Lorem Ipsum irréprochable.{" "}
            </p>

            <p>
              Plusieurs versions sont apparues avec le temps, parfois par
              accident, souvent intentionnellement (histoire d'y rajouter de
              petits clins d'oeil, voire des phrases embarassantes).
            </p>

            <h5 className={clsx(styles.h5)}>
              2. Plusieurs variations de Lorem Ipsum peuvent être trouvées
            </h5>

            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.
            </p>

            <p>
              Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard. Si vous voulez utiliser un
              passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien
              d'embarrassant caché dans le texte. Tous les générateurs de Lorem
              Ipsum sur Internet tendent à reproduire le même extrait sans fin,
              ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum.
              Iil utilise un dictionnaire de plus de 200 mots latins, en
              combinaison de plusieurs structures de phrases, pour générer un
              Lorem Ipsum irréprochable.{" "}
            </p>

            <p>
              Plusieurs versions sont apparues avec le temps, parfois par
              accident, souvent intentionnellement (histoire d'y rajouter de
              petits clins d'oeil, voire des phrases embarassantes).
            </p>

            <h5 className={clsx(styles.h5)}>
              3. Plusieurs variations de Lorem Ipsum peuvent être trouvées
            </h5>

            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.
            </p>

            <p>
              Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard. Si vous voulez utiliser un
              passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien
              d'embarrassant caché dans le texte. Tous les générateurs de Lorem
              Ipsum sur Internet tendent à reproduire le même extrait sans fin,
              ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum.
              Iil utilise un dictionnaire de plus de 200 mots latins, en
              combinaison de plusieurs structures de phrases, pour générer un
              Lorem Ipsum irréprochable.{" "}
            </p>

            <p>
              Plusieurs versions sont apparues avec le temps, parfois par
              accident, souvent intentionnellement (histoire d'y rajouter de
              petits clins d'oeil, voire des phrases embarassantes).
            </p>

            <h5 className={clsx(styles.h5)}>
              4. Plusieurs variations de Lorem Ipsum peuvent être trouvées
            </h5>

            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.
            </p>

            <p>
              Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard. Si vous voulez utiliser un
              passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien
              d'embarrassant caché dans le texte. Tous les générateurs de Lorem
              Ipsum sur Internet tendent à reproduire le même extrait sans fin,
              ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum.
              Iil utilise un dictionnaire de plus de 200 mots latins, en
              combinaison de plusieurs structures de phrases, pour générer un
              Lorem Ipsum irréprochable.{" "}
            </p>

            <p>
              Plusieurs versions sont apparues avec le temps, parfois par
              accident, souvent intentionnellement (histoire d'y rajouter de
              petits clins d'oeil, voire des phrases embarassantes).
            </p>

            <h5 className={clsx(styles.h5)}>
              5. Plusieurs variations de Lorem Ipsum peuvent être trouvées
            </h5>

            <p>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.'
              est qu'il possède une distribution de lettres plus ou moins
              normale, et en tout cas comparable avec celle du français
              standard.
            </p>

            <p>
              Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou
              là, mais la majeure partie d'entre elles a été altérée par
              l'addition d'humour ou de mots aléatoires qui ne ressemblent pas
              une seconde à du texte standard. Si vous voulez utiliser un
              passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien
              d'embarrassant caché dans le texte. Tous les générateurs de Lorem
              Ipsum sur Internet tendent à reproduire le même extrait sans fin,
              ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum.
              Iil utilise un dictionnaire de plus de 200 mots latins, en
              combinaison de plusieurs structures de phrases, pour générer un
              Lorem Ipsum irréprochable.{" "}
            </p>

            <p>
              Plusieurs versions sont apparues avec le temps, parfois par
              accident, souvent intentionnellement (histoire d'y rajouter de
              petits clins d'oeil, voire des phrases embarassantes).
            </p>
          </div>
        </div>

        <div className="w-full px-4 lg:px-60 bg-gray-300 mt-6">
          <div className=" flex flex-col items-center">
            <div>
              <h2 className="text-2xl font-bold my-4 text-center">
                <span>
                  Stay In The <span>Loop</span>
                </span>
              </h2>
              <Image src={mic} alt="" className="mx-auto" />
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
