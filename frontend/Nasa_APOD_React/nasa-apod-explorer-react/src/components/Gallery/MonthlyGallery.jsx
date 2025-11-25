import { useEffect, useState } from "react";
import axios from "axios";
import ApodCard from "../ApodCard/ApodCard.jsx";
import "./Gallery.css"; // Shared gallery styling

function MonthlyGallery({ year, month }) {
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!year || !month) return;

    const fetchMonthly = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8087/api/apod/monthly?year=${year}&month=${month}`);
        const today = new Date().toISOString().split("T")[0];
        // Ensure all dates are in YYYY-MM-DD format
        const formatted = response.data.map(apod => ({
          ...apod,
          date: new Date(apod.date).toISOString().split("T")[0],
        })).filter(apod => apod.date <= today);
        setApods(formatted);
      } catch (err) {
        console.error("Error fetching monthly APODs:", err);
        setApods([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthly();
  }, [year, month]);

  if (loading) return <p>Loading monthly gallery...</p>;
  if (apods.length === 0) return <p>No APODs available for this month.</p>;

  return (
    <div className="gallery-container">
      {apods.map(apod => <ApodCard key={apod.date} apod={apod} />)}
    </div>
  );
}

export default MonthlyGallery;
