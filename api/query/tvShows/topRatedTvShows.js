"use server";
import catchAsyncError from "@lib/catchAsyncError";
import { getReq } from "@utils/api/serverApi";

const topRatedTvShows = catchAsyncError(async (page = 1) => {
  const tv = await getReq("/tv/top_rated", { params: { page } });

  const response = {
    message: "Top Rated TV Shows",
    page: tv?.page,
    totalPages: tv?.total_pages,
    data: tv?.results,
  };

  return response;
});

export default topRatedTvShows;
