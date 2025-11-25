import { useState } from "react";
import MonthlyGallery from "../components/Gallery/MonthlyGallery.jsx";
import YearlyGallery from "../components/Gallery/YearlyGallery.jsx";
import "../styles/GalleryPages.css";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

function GalleryPage() {
  const today = new Date();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [viewType, setViewType] = useState("monthly"); 
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [submitted, setSubmitted] = useState(false);
    
  const monthNames = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];
  // Generate a modern dropdown (NOT number input)
  const yearsList = Array.from({ length: currentYear - 1994 }, (_, i) => currentYear - i);
  const handleFetch = () => {
     setSubmitted(false);
    // Validation
    if (viewType === "monthly") {
     if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth() + 1)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Month",
          text: "Cannot select a future month!",
        });
        return;
      }
    }
      else if (viewType === "yearly") {
      if (year > today.getFullYear()) {
        Swal.fire({
          icon: "error",
          title: "Invalid Year",
          text: "Cannot select a future year!",
        });
        return;
      }
    }

    Swal.fire({
  title: `Fetching ${viewType} APODs...`,
  text: "Please wait while we load the images",
  icon: "info",
  allowOutsideClick: false,
  allowEscapeKey: false,
  showConfirmButton: false,
  didOpen: () => {
    Swal.showLoading();
    setSubmitted(true);
    setTimeout(() => Swal.close(), 1500);
  },
});
    
};

  return (
     <div className="gallery-page container text-center my-4 p-4 bg-light rounded shadow-sm">
      <h2 className="mb-4">NASA APOD Gallery</h2>

      {/* View Type Selector */}
      <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap align-items-center">
        <label className="fw-bold">View By:</label>
        <select className="form-select w-auto" value={viewType} onChange={(e) => {
            setViewType(e.target.value);
            setSubmitted(false); // reset gallery
          }}>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Conditional Inputs */}
      {viewType === "monthly" && (
        <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap align-items-center">
          <label className="fw-bold">Year:</label>
          <select
            className="form-select w-auto"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {yearsList.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>

          <label className="fw-bold">Month:</label>
          <select className="form-select w-auto" value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
            {monthNames.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {viewType === "yearly" && (
        <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap align-items-center">
          <label className="fw-bold">Year:</label>
          <DatePicker
      selected={new Date(year, 0)}           // month = 0 since we only care about year
      onChange={(date) => setYear(date.getFullYear())}
      showYearPicker
      dateFormat="yyyy"
      maxDate={new Date()}                   // cannot select future year
      minDate={new Date(1995, 0)}           // starting year
      className="form-control w-auto"
    />
        </div>
      )}

       {viewType && (
        <button className="btn btn-primary mb-4" onClick={handleFetch}>
          Fetch APODs
        </button>
      )}

      {/* Render galleries */}
      {submitted && viewType === "monthly" && <MonthlyGallery year={year} month={month} />}
      {submitted && viewType === "yearly" && <YearlyGallery year={year} />}
    </div>
  );
}

export default GalleryPage;