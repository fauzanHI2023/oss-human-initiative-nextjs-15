import axios from "axios";

export const fetchDocument = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/document-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_DOCUMENT || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public reports:", error);
    return null;
  }
};
