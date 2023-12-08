/**
 * Making a Fetch request to Route Handler with path and params (if any).
 *
 * @param {String} path - should start with /.
 * @param {Object} params - Optional parameters for the fetch Request.
 * @param {Number} revalidateIn - in SECONDS. Default is 60 Seconds
 * @returns {Response} json data will be returned.
 */

const GetReq = async (path, params, { revalidateIn = 60 } = {}) => {
  const url = new URL(`http://localhost:3000/api${path}`);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateIn, tags: ["fixed"] },
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Include other headers as needed
      },
      credentials: "include",
      cache: "force-cache",
    });

    if (!res.ok) {
      const error = new Error(`Request failed with status ${res.status}`);
      error.status = res.status;
      throw error;
    }

    return res.json();
  } catch (error) {
    throw error;
  }
};

export default GetReq;