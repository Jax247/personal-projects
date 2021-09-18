import "./App.css";
import { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import Card from "./components/card";
import icons from "./iconExport.js";

const apikey = "SrBNFAB1h9zRfpbgQNy4aditlWqUorc6";
// yonkers location key "Key": "3983_PC"

function App() {
  const [state, setState] = useState({
    currentLocation: "",
    degreeType: "F",
    currentWeather: "",
    currentTemp: 0,
    forecastData: [],
    hasData: false,
  });
  const [desiredLocation, setDesiredLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [degreeType, changeDegreeType] = useState("F");
  const [currentWeather, setcurrentWeather] = useState("");
  const [currenttemp, setcurrenttemp] = useState(0);
  const [hasData, setDataLoaded] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);

  // TODO:

  const fetchLocationData = async () => {
    // location comes in as a zipcode number or string

    await fetch(
      `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apikey}&q=${desiredLocation}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setState({
            ...state,
            currentLocation: `${result[0].LocalizedName},${result[0].AdministrativeArea.EnglishName}`,
          });
          setCurrentLocation(
            `${result[0].LocalizedName},${result[0].AdministrativeArea.EnglishName}`
          );
          fetchWeatherData(result[0]["Key"]);
          fetchDailyData(result[0]["Key"]);
          fetchHourlyData(result[0]["Key"]);

          // setAdminArea(result[0].AdministrativeArea.EnglishName)
          console.log(state);
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
        setState({
          ...state,
          currentWeather: result[0].WeatherText,
        });
        setcurrentWeather(result[0].WeatherText);
        setState({
          ...state,
          currentTemp: result[0].Temperature.Imperial.Value,
        });
        setcurrenttemp(result[0].Temperature.Imperial.Value);
        setcurrentWeather(result[0].WeatherText);
        setDataLoaded(false);
        setDataLoaded(true); // Reset the cards for animation purposes
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchDailyData = async (key) => {
    await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apikey}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          // setState({
          //   ...state,
          //   forecastData: result.DailyForecasts
          // })

          result.DailyForecasts.forEach((Day) => {
            state.forecastData.push(Day);
          });
          setDataLoaded(false);
          setDataLoaded(true); // Reset the cards for animation purposes
          console.log("Forecast Data", state.forecastData);
        },
        (error) => {
          console.error(error);
        }
      )
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchHourlyData = async (key) => {
    await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${apikey}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("Hourly Data", result);
        // get hour, temp, conditions for the hour
        let arr = [];
        let obj;
        let d;

        result.forEach((data) => {
          d = new Date(data.DateTime).getHours();
          if (d > 12) {
            d = `${d - 12}PM`;
          } else if (d === 0) {
            d = `${12}AM`;
          } else {
            d = `${d}AM`;
          }

          // console.log(d)
          obj = {
            hour: d,
            temp: data.Temperature.Value,
            conditions: data.IconPhrase,
            icon: data.WeatherIcon,
          };

          arr.push(obj);
        });

        setHourlyData(arr);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("ClassList", e.target.classList);
    fetchLocationData();
  };

  const degreeVerification = (temp) => {
    if (degreeType === "F") return temp;

    return Math.round((temp - 32) * (5 / 9));
  };

  return (
    <div className="App">
      <header className={`${hasData ? "animateform" : ""}`}>
        <span>
          <p className="site-name">Millenia Weather</p>
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
            className={""}
            type="text"
            value={state.desiredLocation}
            id="search"
            placeholder="Enter Zip Code"
            onChange={(e) => setDesiredLocation(e.target.value)}
          />
          <button className="fill-two" id="search-submit" type="submit">
            Show Weather
          </button>
        </form>
      </header>

      {hasData && (
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
        </div>
      )}

      <main>
        {hasData && (
          <div className="hourly-data">
            {hourlyData.map((data, index) => (
              <div className="hour-block" key={index}>
                <p>{data.hour}</p>
                <img src={icons[data.icon]} alt={data.icon} />
                <p>{degreeVerification(data.temp)}&deg;</p>
              </div>
            ))}
          </div>
        )}
        {hasData && (
          <span className="card-content">
            {state.forecastData.map((day, index) => (
              <Card
                key={index}
                index={index}
                degree={degreeType}
                temp={day.Temperature.Maximum.Value}
                conditions={day.Day.IconPhrase}
                lo={day.Temperature.Minimum.Value}
                hi={day.Temperature.Maximum.Value}
                day={day.Date}
                icon={day.Day.Icon}
              />
            ))}
          </span>
        )}
      </main>
    </div>
  );
}

export default App;
