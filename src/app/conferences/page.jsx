"use client";
import React, { useEffect, useState } from "react";
import { useData } from "../context/store";
import ConferenceTable from "@/components/conferenceTable";
import FilterBar from "@/components/filterBar";
import { getCurrentDate, addQuotesToString } from "@/utils/utils";
import { getUpcomingConferences } from "@/services/api/conferenceAPI";

const Conferences = () => {
  const { state, dispatch } = useData();
  const currentDate = getCurrentDate();
  const convertedDate = addQuotesToString(currentDate);

  const fetchData = async () => {
    try {
      dispatch({ type: "LOADING", payload: true });
      const { data, hasEndCursor, hasNextPage } = await getUpcomingConferences(
        convertedDate
      );

      dispatch({ type: "FETCH_CONFERENCES", payload: data });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      console.log("error in fetching data", error);
      dispatch({ type: "LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const currentYear = currentDate.split("-")[0];

  return (
    <main className="min-h-[600px]">
      <h1 className="text-[30px] sm:text-[40px] lg:text-[56px] font-[800] text-neutral-base -tracking-[1.12px] mt-[30px] lg:mt-[40px]">
        Developers Conferences
      </h1>
      <p className="text-neutrals-800 font-[500] text-[25px] sm:text-[30px] lg:text-[40px]">
        for {currentYear}
      </p>
      <p className="text-[14px] sm:text-[16px] lg:text-[18px] pt-[12px] text-neutrals-600 pb-[48px]">
        A curated list of the developer conferences for {currentYear} and beyond
      </p>
      <FilterBar />
      {state.loading ? (
        <p className="text-neutrals-800">Loading data...</p>
      ) : state.allConferences.length > 0 ? (
        <ConferenceTable data={state.allConferences} />
      ) : (
        <p>No conferences found!</p>
      )}
    </main>
  );
};

export default Conferences;
