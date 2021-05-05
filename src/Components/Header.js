import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("./Dashboard"));
const VaccineGuide = React.lazy(() => import("./VaccineGuide"));
const NotFound = React.lazy(() => import("./NotFound"));

export default function Header() {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand href="home">
            Covid Vaccination Slot Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="guide">Guide</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
          <Route exact path="/home" render={() => <Dashboard />} />
          <Route exact path="/guide" render={() => <VaccineGuide />} />
          <Route component={NotFound} />        
        </Switch>
      </Router>
    </React.Suspense>
  );
}
