import { createSlice } from "@reduxjs/toolkit";
import { fetchPodcastByAllFilter } from "./action";
import { clearFiltersFromURL } from "@/utils/utils";
import { PODCASTS_URL } from "@/utils/constants";

const initialState = {
  allPodcasts: [],
  langSelected: "",
  audienceSelected: "",
  tagSelected: "",
  status: "",
  error: "",
  startCursor: "",
  endCursor: "",
  hasNextPage: "",
  hasPreviousPage: "",
};

export const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    clearPodcastFilters: (state, action) => {
      state.langSelected = "";
      state.audienceSelected = "";
      state.tagSelected = "";

      clearFiltersFromURL(PODCASTS_URL);
    },
    setPodcastDataByUrl: (state, action) => {
      state.langSelected = action.payload?.langSelected ?? "";
      state.audienceSelected = action.payload?.audienceSelected ?? "";
      state.tagSelected = action.payload?.tagSelected ?? "";
    },
    setLangFilter: (state, action) => {
      state.langSelected = action.payload;
    },
    setAudienceFilter: (state, action) => {
      state.audienceSelected = action.payload;
    },
    setTagFilter: (state, action) => {
      state.tagSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchPodcastByAllFilter
      .addCase(fetchPodcastByAllFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcastByAllFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.allPodcasts = action.payload?.data;
        state.startCursor = action.payload?.hasStartCursor;
        state.endCursor = action.payload?.hasEndCursor;
        state.hasNextPage = action.payload?.hasNextPage;
        state.hasPreviousPage = action.payload?.hasPreviousPage;
      })
      .addCase(fetchPodcastByAllFilter.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const {
  clearPodcastFilters,
  setPodcastDataByUrl,
  setLangFilter,
  setAudienceFilter,
  setTagFilter,
} = podcastSlice.actions;

export default podcastSlice.reducer;
