import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Custom hook to fetch APOD data from backend API
 * @param {string} url - API endpoint
 */
export function useFetchApod(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    axios.get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
