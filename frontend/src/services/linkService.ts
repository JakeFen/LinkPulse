import type { linkResponse } from "../types/link";

const createLink = async (
  longURL: string,
  token: string
): Promise<linkResponse> => {
  console.log("token: ", token);
  const response = await fetch("/api/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url: longURL }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response.json();
};

export default createLink;
