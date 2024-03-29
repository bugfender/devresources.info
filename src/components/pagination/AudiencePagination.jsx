"use client";
import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SecondaryBtn from "../secondaryBtn";
import { updateURLAndData } from "@/utils/urlFunc";

const AudiencePagination = ({ stateObj, URL }) => {
  const router = useRouter();
  const createQueryString = useCallback((queryParams) => {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(queryParams)) {
      if (value !== "") {
        params.set(name, value);
      }
    }
    return params.toString();
  }, []);

  const previousClickHandler = () => {
    const url = updateURLAndData(URL, {
      langSelected: stateObj?.langSelected,
      audienceSelected: stateObj?.audienceSelected,
      tagSelected: stateObj?.tagSelected,
    });
    const queryParams = {
      hasStartCursor: stateObj?.startCursor,
      hasEndCursor: stateObj?.endCursor,
      page: "previous",
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  const nextClickHandler = () => {
    const url = updateURLAndData(URL, {
      langSelected: stateObj?.langSelected,
      audienceSelected: stateObj?.audienceSelected,
      tagSelected: stateObj?.tagSelected,
    });

    const queryParams = {
      hasStartCursor: stateObj?.startCursor,
      hasEndCursor: stateObj?.endCursor,
      page: "next",
    };

    router.push(`${url}/?${createQueryString(queryParams)}`);
  };

  useEffect(() => {
    if (stateObj?.hasPreviousPage.toString() !== "true") {
      const url = updateURLAndData(URL, {
        langSelected: stateObj?.langSelected,
        audienceSelected: stateObj?.audienceSelected,
        tagSelected: stateObj?.tagSelected,
      });

      router.push(`${url}`);
    }
  }, [stateObj?.hasNextPage, stateObj?.hasPreviousPage]);

  return (
    <div>
      <div className="flex justify-between my-5 xl:my-7">
        <SecondaryBtn
          clickHandler={previousClickHandler}
          shouldDisable={stateObj?.hasPreviousPage.toString()}
        >
          <IoIosArrowBack className="-ml-[4px] text-[12px] xl:text-[14px]" />
          <span className="pl-[2px] lg:pl-1 text-[12px] xl:text-[14px]">
            Previous
          </span>
        </SecondaryBtn>
        <SecondaryBtn
          clickHandler={nextClickHandler}
          shouldDisable={stateObj?.hasNextPage.toString()}
        >
          <span className="pr-[2px] lg:pr-1 text-[12px] xl:text-[14px]">
            Next
          </span>
          <IoIosArrowForward className="-mr-[4px] text-[12px] xl:text-[14px]" />
        </SecondaryBtn>
      </div>
    </div>
  );
};

export default AudiencePagination;
