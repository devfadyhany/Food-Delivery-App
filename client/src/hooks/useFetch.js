import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/API";
import axios from "axios";

const cache = {};

export const useFetch = (endpoint, queryParams, time) => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let url = `${API_BASE_URL}/${endpoint}${
    queryParams &&
    `?${queryParams.map((param) => `${param.key}=${param.value}`)}`
  }`;

  url = url.replaceAll(",", "&");

  let dependencyList = queryParams.map((param) => param.value);

  const refresh = async () => {
    try {
      delete cache[url];
      setLoading(true);

      const response = await axios.get(url);

      if (response.status === 200) {
        setList(response.data.data);
        if (total === 0) {
          setTotal(response.data.total);
        }
      }
      cache[url] = { value: response.data, expiry: Date.now() + time };
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async function () {
      const entry = cache[url];

      if (!entry || Date.now() > entry.expiry) {
        try {
          setLoading(true);

          const response = await axios.get(url);

          if (response.status === 200) {
            setList(response.data.data);
            if (total === 0) {
              setTotal(response.data.total);
            }
          }
          cache[url] = { value: response.data, expiry: Date.now() + time };
        } catch (error) {
          setError(error.response.data.message);
        } finally {
          setLoading(false);
        }
      } else {
        setList(cache[url].value.data);
        setTotal(cache[url].value.total);
      }
    })();
  }, [...dependencyList]);

  return { list, total, error, loading, refresh };
};
