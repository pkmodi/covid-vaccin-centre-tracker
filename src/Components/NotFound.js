import { NavLink } from "react-router-dom";

const NotFound = () => (
  <>
    <div className="setStyle2">
      <h1> 404 Error Page</h1>
      <p> Sorry, This page doesn't exist</p>
      <NavLink to="/"> Go Back </NavLink>
    </div>
  </>
);

export default NotFound;
