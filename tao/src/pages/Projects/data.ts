export interface Project {
  name: string;
  type: string;
  tags: ProjectTag[];
  screenshotpath: string;
  description: string;
  srcLink: string;
  liveLink: string;
}
export type ProjectTag = {
  name: string;
  color: string;
  icon: string;
};

const ReactTag: ProjectTag = {
  name: "React",
  color: "#2196f3",
  icon: "/icons/react-icon.png",
};
const HTMLTag: ProjectTag = {
  name: "HTML",
  color: "#f36f21",
  icon: "/icons/html-icon.png",
};

const CSSTag: ProjectTag = {
  name: "CSS3",
  color: "#0000ff",
  icon: "/icons/css-icon.png",
};
const SASSTag: ProjectTag = {
  name: "Sass",
  color: "#d34fff",
  icon: "/icons/sass-icon.png",
};
const StyledTag: ProjectTag = {
  name: "Styled",
  color: "#3D3D3D",
  icon: "/icons/styled-icon.png",
};
const JSTag: ProjectTag = {
  name: "JS",
  color: "#ffeb3b",
  icon: "/icons/JS-icon.png",
};
const TSTag: ProjectTag = {
  name: "TS",
  color: "#155fff",
  icon: "/icons/TS-icon.svg.png",
};
const MUITag: ProjectTag = {
  name: "MUI",
  color: "#011E3C",
  icon: "/icons/mui-logo.png",
};
const MongoTag: ProjectTag = {
  name: "MongoDB",
  color: "#3F3E42",
  icon: "/icons/MongoDB_Logo.png",
};
const RTKQueryTag: ProjectTag = {
  name: "RTK",
  color: "#593d88",
  icon: "/icons/reduxTK.png",
};
const ExpressTag: ProjectTag = {
  name: "Express",
  color: "#70c1ff",
  icon: "/icons/express-icon.png",
};
const DefaultTag = (name:string) => {
  let tag = {
    name,
    color: "#aaa",
    icon: "/icons/gear-icon.png"
  };
  return tag as ProjectTag;
};
export const projects: Project[] = [
  {
    name: "Accel",
    type: "Admin Dashboard React/Node ",
    tags: [ReactTag, TSTag, ExpressTag,  MUITag, RTKQueryTag, MongoTag],
    screenshotpath: "/screenshots/accel-screenshot.png",
    description:
      "A Full Stack Admin Dashboard made to access and visualize sales transaction data. Complete with a custom NodeJS server and MongoDB database.",
    srcLink:
      "https://github.com/Jax247/personal-projects/tree/master/accel-dashboard",
    liveLink: "https://acceldash.netlify.app",
  },
  {
    name: "PageMe",
    type: "React Messaging App",
    tags: [ReactTag, CSSTag, ExpressTag, DefaultTag("GetStream")],
    screenshotpath: "./screenshots/pageMe-screenshot.png",
    description:
      "Chatroom application made to streamline paging medical professionals in a team. Utilizes the GetStream API and ExpressJS to allow authentication and messaging. ",
    srcLink:
      "https://github.com/Jax247/personal-projects/tree/master/med-pager",
    liveLink: "https://pagemej.netlify.app",
  },
  {
    name: "Solute ",
    type: "Landing Page Example",
    tags: [HTMLTag, CSSTag, SASSTag],
    screenshotpath: "./screenshots/solute-screenshot.png",
    description:
      "Landing page layout example made with HTML and CSS for any business to market themselves",
    srcLink: "https://github.com/Jax247/personal-projects/tree/master/solute",
    liveLink: "https://solute.netlify.app",
  },
  {
    name: "Crypt",
    type: "React App Example",
    tags: [ReactTag, SASSTag, DefaultTag("Chart.js"), DefaultTag("CoinGecko")],
    screenshotpath: "./screenshots/crypt-screenshot.png",
    description:
      "Crypto Currency Price tracker made with React, Chart.js, and the CoinGecko API. Displays price information for the top 15 coins with a graph displaying coin price timelines. ",
    srcLink: "https://github.com/Jax247/personal-projects/tree/master/crypt",
    liveLink: "https://krcointracker.netlify.app",
  },
  {
    name: "Portfolio",
    type: "Personal Portfolio",
    tags: [ReactTag, TSTag, CSSTag, StyledTag],
    screenshotpath: "./screenshots/portfoliov2-screenshot.png",
    description:
      "First iteration of my personal site that you're on now! Made entirely in HTML, SCSS, and Javascript/Jquery.",
    srcLink:
      "https://github.com/Jax247/personal-projects/tree/master/portfolio",
    liveLink: "jewanjeffries.com",
  },
  // {
  //   name: "Millenia Weather",
  //   type: "React App",
  //   tags: [ReactTag, "CSS", "Accuweather API"],
  //   screenshotpath: "../assets/millenia-screenshot.png",
  //   description: "Weather App made With React, recieving data from the external Accuweather API to tell the weather information of a zip code.",
  //   srcLink: "https://github.com/Jax247/personal-projects/tree/master/millenia",
  //   liveLink: 'https://milleniaweather.netlify.app',
  // },
];
