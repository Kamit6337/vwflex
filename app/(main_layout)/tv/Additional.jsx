/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Episodes from "./Episodes";
import Recommendations from "./Recommendation";
import Similar from "./Similar";
import TvShowsImages from "./TvShowsImages";
import Reviews from "./Reviews";

const detailSection = "detail";
const recommendationSection = "recommendation";
const similarSection = "similar";
const episodesSection = "episodes";
const imageSection = "images";
const reviews = "reviews";

const Additional = ({ details, id, season }) => {
  const [optionSelected, setOptionSelected] = useState(episodesSection);
  const {
    production_companies,
    production_countries,
    spoken_languages,
    revenue,
    budget,
    overview,
    episodes,
    created_by,
  } = details;

  useEffect(() => {
    setOptionSelected(episodesSection);
  }, [id, season]);

  const scrollOptionsToTop = (value) => {
    setOptionSelected(value);

    setTimeout(function () {
      window.scrollTo({
        top: window.innerHeight - 56,
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <>
      <div className="sticky top-14 bottom-0 z-20 w-full font-medium tracking-wider flex justify-center pb-2 h-[60px] tablet:text-sm">
        <div className="w-max flex items-center gap-6 tablet:gap-3   rounded-2xl  px-10 tablet:px-5 h-full  border-2 border-slate-600 bg-black mobile:text-xs">
          <p
            className={`${
              optionSelected === episodesSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollOptionsToTop(episodesSection)}
          >
            Episodes
          </p>

          <p
            className={`${
              optionSelected === recommendationSection &&
              "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollOptionsToTop(recommendationSection)}
          >
            Recommendations
          </p>

          <p
            className={`${
              optionSelected === similarSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer `}
            onClick={() => scrollOptionsToTop(similarSection)}
          >
            Similar
          </p>
          <p
            className={`${
              optionSelected === detailSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(detailSection)}
          >
            Details
          </p>
          <p
            className={`${
              optionSelected === imageSection && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(imageSection)}
          >
            Images
          </p>
          <p
            className={`${
              optionSelected === reviews && "border-b-2 border-white"
            } hover:border-b-2 hover:border-white cursor-pointer`}
            onClick={() => scrollOptionsToTop(reviews)}
          >
            Reviews
          </p>
        </div>
      </div>

      {/* MARK: OPTIONS SELECTED */}

      {optionSelected === detailSection && (
        <div className="p-16 tablet:px-5 flex flex-col items-start justify-between gap-12 relative z-10 w-full">
          {overview && (
            <div>
              <p className="details_title">DESCRIPTION</p>
              <p className="tracking-wider leading-6 tablet:text-sm">
                {overview}
              </p>
            </div>
          )}

          {created_by && created_by.length > 0 && (
            <div>
              <p className="details_title">Created By</p>
              <div className="flex justify-start gap-4 flex-wrap">
                {created_by.map((by, i) => {
                  return <div key={i}>{by.name}</div>;
                })}
              </div>
            </div>
          )}

          <div>
            <p className="details_title">PRODUCTION COMPANIES</p>
            <div className="flex justify-start gap-8 sm:gap-4 sm:flex-wrap">
              {production_companies.map((company, i) => {
                const { logo_path, name } = company;

                return (
                  <p key={i} className="sm:text-sm">
                    {name}
                  </p>
                );
              })}
            </div>
          </div>

          <div>
            <p className="details_title">PRODUCTION COUNTRIES</p>
            <div className="flex justify-start gap-8">
              {production_countries.map((country, i) => {
                return (
                  <p key={i} className="sm:text-sm ">
                    {country.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div>
            <p className="details_title">AUDIO LANGUAGE</p>
            <div className="flex justify-start gap-6">
              {spoken_languages.map((language, i) => {
                return (
                  <p key={i} className="sm:text-sm">
                    {language.english_name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {optionSelected === episodesSection && (
        <div className="w-full flex flex-col gap-8 sm_lap:gap-6 py-20 tablet:py-10 px-10 sm_lap:px-6 tablet:px-3">
          <Episodes data={episodes} />
        </div>
      )}

      {optionSelected === recommendationSection && <Recommendations id={id} />}

      {optionSelected === similarSection && <Similar id={id} />}

      {optionSelected === imageSection && <TvShowsImages id={id} />}

      {optionSelected === reviews && <Reviews id={id} />}
    </>
  );
};

export default Additional;
