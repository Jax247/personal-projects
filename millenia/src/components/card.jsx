import React, { Component } from "react";
import "../App.css";
import icons from "../iconExport.js";

class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDesc: "",
    };
  }

  degreeVerification(temp) {
    if (this.props.degree === "F") return temp;

    return Math.round((temp - 32) * (5 / 9));
  }

  findDay(date) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const daynum = new Date(date).getDay();
    const today = new Date().getDay();

    if (daynum - today === 0) return "Today";

    if (daynum - today === 1) return "Tomorrow";

    return weekdays[daynum];
  }

  getIcon() {
    let icon = this.props;

    return icons[icon];
  }

  decideColor() {
    // if it has t-storms display that
    // if it has cloudy display that
    // if it has rain display that
    // if it has snow display that

    const {conditions} = this.props; 

    let string = conditions.toLowerCase().replace(/ /g, "");

    // const weatherArr = ['t-storms', 'showers', 'snow', 'hail', 'sunny', 'rain']

    if (string.includes("t-storms")){
      return "thunderstorms"
    }
    else if(string.includes("sunny")){
      return "sunny"
    }
    else if (string.includes("showers")){
      return "rain";
    }
    else if (string.includes("cloudy")){
      return "cloudy"
    }
    else if (string.includes("snow") || string.includes("hail")){
      return "hail"
    }
    
  }

  render() {
    const { index, day, conditions, temp, degree, lo, hi, icon } = this.props;
    return (
      <div className="card-wrapper">
        <h4>{this.findDay(day)}</h4>
        <div
          className={`card-body ${this.decideColor()} index${index}`}
        >
          <img src={icons[icon]} alt="" className="card-icon" />
          <h1>
            {this.degreeVerification(temp)}&deg;{degree}
          </h1>
          <p style={{ height: 38 }}>{conditions}</p>
          <p style={{ margin: 0 }}>lo/hi</p>
          <p style={{ margin: 0 }}>
            {this.degreeVerification(lo)}/{this.degreeVerification(hi)}
          </p>
        </div>
      </div>
    );
  }
}

export default card;
