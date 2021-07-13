import React, { Component } from "react";
import "../App.css";
class card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDesc: "",
    };
  }

  componentDidMount() {}

  degreeVerification(temp) {
    if (this.props.degree === "F") return temp;

    return Math.round((temp - 32) * (5 / 9));
  }

  render() {
    const { day, conditions, temp, degree, lo, hi } = this.props;
    return (
      <>
        <h4>{day}</h4>
        <div
          className={`card-body ${conditions.toLowerCase().replace(/ /g, "")}`}
        >
          <img src="" alt="" className="card-icon" />
          <h1>
            {this.degreeVerification(temp)}&deg;{degree}
          </h1>
          <p>{conditions}</p>
          <p>
            {this.degreeVerification(lo)}/{this.degreeVerification(hi)}
          </p>
        </div>
      </>
    );
  }
}

export default card;
