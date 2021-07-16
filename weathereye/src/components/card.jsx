import React, { Component } from "react";
import "../App.css";
import icon from '../assets/cloudy.png'

function   importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


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

  findDay(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
    const daynum = new Date(date).getDay()
    const today = new Date().getDay()

    if(daynum - today == 0)
      return "Today"

    if(daynum - today == 1)
      return "Tomorrow"
    

    return weekdays[daynum]
  }

  // getIcon(){
  //   let conditions = this.props
  //   let icons = importAll(require.context('../assets', false, '/\.png/'));
  //   return icons['cloudy.png'];

  // }

  render() {
    const { key, day, conditions, temp, degree, lo, hi } = this.props;
    return (
      <div className="card-wrapper">
        <h4>{this.findDay(day)}</h4>
        <div
          className={`card-body ${conditions.toLowerCase().replace(/ /g, "")} index${key}`}
        >
          <img src={this.getIcon()} alt="" className="card-icon" />
          <h1>
            {this.degreeVerification(temp)}&deg;{degree}
          </h1>
          <p style={{height: 38}}>{conditions}</p>
          <p style={{margin: 0}}>lo/hi</p>
          <p style={{margin: 0}}>
            {this.degreeVerification(lo)}/{this.degreeVerification(hi)}
          </p>
        </div>
      </div>
    );
  }
}

export default card;
