"use server";

import catchAsyncError from "@lib/catchAsyncError";
import WatchListMovie from "@models/WatchlistMovieModel";
import { decrypt } from "@utils/encryption/encryptAndDecrypt";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const removeMovieFromWatchlist = catchAsyncError(async (details) => {
  const token = cookies().get("token");

  if (!token) {
    throw new Error("You session has expired. Please login again");
  }

  const decoded = decrypt(token.value);
  const userId = decoded.id;

  const { id: movieId } = details;

  await WatchListMovie.deleteOne({
    user: userId,
    id: movieId,
  });

  revalidatePath("/watchlist");

  return "Removed Successfully";
});

export default removeMovieFromWatchlist;
