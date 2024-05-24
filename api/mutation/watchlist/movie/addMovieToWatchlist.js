"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import verifyWebToken from "@utils/auth/verifyWebToken";
import connectToDB from "@utils/mongoose/connectToDB";
import { cookies } from "next/headers";

const addMovieToWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = verifyWebToken(token.value);
  const userId = decoded.id;

  const {
    id: movieId,
    title,
    overview,
    backdrop_path,
    release_date,
    vote_average,
  } = details;

  await connectToDB();

  await WatchListMovie.create({
    user: userId,
    id: movieId,
    title,
    overview,
    backdrop_path,
    release_date,
    vote_average,
  });



  return "Add Successfully";
});

export default addMovieToWatchlist;
