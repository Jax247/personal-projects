import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import Card from "./components/card";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// Accu-Weather API being used to get the weather data
// Needs: Search, display current weather,
// and have the list of the weather for days to come

const apikey = "SrBNFAB1h9zRfpbgQNy4aditlWqUorc6";
// yonkers location key "Key": "3983_PC"

const DataObject = {
  temp: 90,
  weatherCondition: "Sunny",
};

function App() {
  const [desiredLocation, setDesiredLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState('')
  const [degreeType, changeDegreeType] = useState("F");
  const [currentWeather, setcurrentWeather] = useState("");
  const [currenttemp, setcurrenttemp] = useState(0);
  const [adminArea, setAdminArea] = useState('')
  const [Data, setData] = useState(DataObject);
  const [hasData, setDataLoaded] = useState(false);

  // TODO:
  // fetch location data DONE
  // animate header movements
  // change main content to cards In Progress
  // add switch for hourly
  // add switch for Imperial/Metric DONE
  // add current location data to header DONE

  const fetchLocationData = async () => {
    // location comes in as a zipcode number or string

    await fetch(
      `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apikey}&q=${desiredLocation}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentLocation(`${result[0].LocalizedName},${result[0].AdministrativeArea.EnglishName}`)
          // setAdminArea(result[0].AdministrativeArea.EnglishName)
          fetchWeatherData(result[0]["Key"]);
          console.log(result[0]);
        },
        (error) => {
          console.error("Error Obtaining Location", error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchWeatherData = async (Key) => {
    console.log("Key", Key);

    await fetch(
      `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${apikey}&details=true`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(`Weather Data for ${Key}`, result);
        setcurrentWeather(result[0].WeatherText);
        setcurrenttemp(result[0].Temperature.Imperial.Value);
        setDataLoaded(false);
        setDataLoaded(true); // Reset the cards for animation purposes
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("ClassList", e.target.classList);
    await fetchLocationData();
  };

  const degreeVerification = (temp) => {
    if (degreeType === "F") return temp;

    return Math.round((temp - 32) * (5 / 9));
  };

  return (
    <div className="App">
      <header className={`${hasData ? "animateform" : ""}`}>
        <span>
          <p className="site-name">M.Weather</p>
          <img id="site-icon" src={logo} alt="logo" />
        </span>

        {hasData && (
          <div className="current-temp">
            <h2>{currentLocation}</h2>
            <h1>{degreeVerification(currenttemp)}&deg;</h1>
            <p>{currentWeather}</p>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <input
            className={`${desiredLocation !== "" ? "" : ""}`}
            type="text"
            value={desiredLocation}
            id="search"
            placeholder="Enter Zip Code or a City Name"
            onChange={(e) => setDesiredLocation(e.target.value)}
          />
          <button className="fill-two" id="search-submit" type="submit">
            Show Weather
          </button>
        </form>
      </header>

      <div className="switches">
        <div className="leftsw">
          <p className="swlabel">F/C</p>
          <label className="switch">
            <input
              type="checkbox"
              onClick={() => {
                degreeType === "C"
                  ? changeDegreeType("F")
                  : changeDegreeType("C");
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="rightsw">
          <p className="swlabel">Hourly</p>
          <label className="switch">
            <input
              type="checkbox"
              onClick={() => {
                
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <main>
        <Card
          degree={degreeType}
          temp={50}
          conditions="Partly Cloudy"
          lo={30}
          hi={55}
          day="Monday"
        />
        {hasData && (
          <span className="card-content">
            {/* <Card />
            <Card />
            <Card />
            <Card />
            <Card /> */}
          </span>
        )}
      </main>
    </div>
  );
}

export default App;
