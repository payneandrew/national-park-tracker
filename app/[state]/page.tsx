"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";

const StatePage = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  async function fetchApiData() {
    try {
      const response = await axios.get("http://localhost:3000/parks");
      console.log(response.data); // should log { text: 'Hello' }
    } catch (error) {
      console.error("An error occurred while fetching the data.", error);
    }
  }

  fetchApiData();

  return <h1>This is the page for {state}</h1>;
};

export default StatePage;
