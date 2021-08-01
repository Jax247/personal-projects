import logo from "../assets/kiss.png";
// Layout for the application at large.
// Pass in children to get the same layout across multiple pages

const Layout = ({ children, title = "Crypt", image }) => {
  return (
    <div className="layout">
      <header>
        <h1>Crypt Coin Tracker</h1>
        <img src={logo} alt="logo" className="layout-logo" />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
