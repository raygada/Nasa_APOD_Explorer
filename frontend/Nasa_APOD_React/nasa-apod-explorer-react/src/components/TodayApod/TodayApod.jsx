import { useEffect, useState } from "react";
import ApodCard from "../ApodCard/ApodCard.jsx";
import axios from "axios";

function TodayApod() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8087/api/apod/today")
      .then(res => setApod(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!apod) return <p>Loading today's APOD...</p>;

  return <ApodCard apod={apod} />;
}

export default TodayApod;
