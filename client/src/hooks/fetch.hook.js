import axios from "axios";
import { useState, useEffect } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** custom hook */

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { username } = !query ? await getUsername() : '';

        console.log(username);
        console.log("liooooo");
        
        
        const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);

        if (status === 200 || status === 201) {
          setData((prev) => ({
            ...prev,
            apiData: data,
            status: status,
            isLoading: false,
          }));
        } else {
          setData((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.log(error);
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
