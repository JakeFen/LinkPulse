import type { Link, LinkResponse } from "../types/link";

const API_URL = import.meta.env.VITE_API_URL || "";

export const createLink = async (
  longURL: string,
  token: string
): Promise<Link> => {
  const response = await fetch(`${API_URL}/api/links`, {
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

export const getLinks = async (token: string): Promise<LinkResponse> => {
  const response = await fetch(`${API_URL}/api/links`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch links");
  }

  return response.json();
};

export const deleteLink = async (token: string, id: number) => {
  const response = await fetch(`${API_URL}/api/links/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete links");
  }
};
