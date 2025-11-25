import { useState } from "react";
import ApodCard from "../ApodCard/ApodCard.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import "./DatePickerApod.css"; 

function DatePickerApod() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [apod, setApod] = useState(null);

  const handleFetch = async () => {
    if (!date) {
      Swal.fire({
        icon: "warning",
        title: "No Date Selected!",
        text: "Please choose a valid date before fetching APOD.",
      });
      return;
    }

    Swal.fire({
      title: "Fetching APOD...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const res = await axios.get(`http://localhost:8087/api/apod?date=${date}`);
      setApod(res.data);

      Swal.fire({
        icon: "success",
        title: "APOD Loaded!",
        text: "Your Astronomy Picture of the Day is ready.",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error Fetching APOD",
        text: "Invalid date or backend not running.",
      });
    }
  };


  return (
    <div className="datepicker-wrapper">
      <div className="datepicker-box">
        <label>Select Date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          max={today}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn btn-primary fetch-btn" onClick={handleFetch}>
          Fetch APOD
        </button>
      </div>

      {apod && (
        <div className="apod-result">
          <ApodCard apod={apod} />
        </div>
      )}
    </div>
  );
}

export default DatePickerApod;
