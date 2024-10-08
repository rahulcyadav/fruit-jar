import { mockData } from "./mockData";
import { delay } from "./utils";

export const fetchFruits = async () => {
  try {
    const response = await fetch("https://www.fruityvice.com/api/fruit/all");
    if (!response.ok) {
      throw new Error("Failed to fetch fruits");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fruits:", error);
    return [];
  }
};

export const fetchFruitsMock = async () => {
  console.log("fetchFruitsMock");
  await delay(2000);
  if (Math.random() > 0.5) {
    const responseJson = mockData;
    return responseJson;
  }
  throw new Error("Network error");
};
