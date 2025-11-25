import TodayApod from "../components/TodayApod/TodayApod.jsx";
import DatePickerApod from "../components/DatePickerApod/DatePickerApod.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
        <h1>Welcome to NASA APOD Explorer</h1>
      <h2>Today's Astronomy Picture</h2>
      <TodayApod />
      <hr />
      <h3>Search by Date</h3>
      <DatePickerApod />
    </div>
  );
}

export default Home;
