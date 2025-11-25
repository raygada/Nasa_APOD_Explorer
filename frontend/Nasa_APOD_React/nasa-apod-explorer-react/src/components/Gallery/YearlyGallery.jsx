import { useEffect, useState } from "react";
import axios from "axios";
import ApodCard from "../ApodCard/ApodCard.jsx";
import "./Gallery.css"; // Shared gallery styling

function YearlyGallery({ year }) {
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!year) return;
    const today = new Date().toISOString().split("T")[0];
    const currentYear = new Date().getUTCFullYear();

    // Skip if year is in the future
    if (year > currentYear) {
      setApods([]);
      setLoading(false);
      return;
    }

    const fetchYearly = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8087/api/apod/yearly?year=${year}`);
        const formatted = response.data.map(apod => ({
          ...apod,
          date: new Date(apod.date).toISOString().split("T")[0],
        })).filter(apod => apod.date <= today);
        setApods(formatted);
      } catch (err) {
        console.error("Error fetching yearly APODs:", err);
        setApods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchYearly();
  }, [year]);

  if (loading) return <p>Loading yearly gallery...</p>;
  if (apods.length === 0) return <p>No APODs available for this year.</p>;

  return (
    <div className="gallery-container">
      {apods.map(apod => <ApodCard key={apod.date} apod={apod} />)}
    </div>
  );
}

export default YearlyGallery;
