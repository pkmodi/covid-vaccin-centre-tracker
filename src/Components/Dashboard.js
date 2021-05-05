import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Select from "react-select";
import moment from "moment";
import _ from "lodash";
import VaccineCenters from "./VaccineCenters";
import * as DashboardService from "../Services/DashboardService";

const statesUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
const districtsUrl =
  "https://cdn-api.co-vin.in/api/v2/admin/location/districts/";
const searchByDistUrl =
  "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict";
//const searchByPinUrl = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";

function Dashboard() {
  const [indiaStates, setIndiaStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [availableCentreDetails, setAvailableCentreDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(0);

  const loadStates = () => {
    DashboardService.getAll(statesUrl).then((response) => {
      if (
        response.data &&
        response.data.states &&
        response.data.states.length > 0
      ) {
        let states = [];
        response.data.states.map((s) =>
          states.push({
            value: s.state_id,
            label: s.state_name,
          })
        );
        setIndiaStates(states);
      }
    });
  };

  const loadDistricts = (districtNumber) => {
    const url = `${districtsUrl}${districtNumber}`;
    DashboardService.getAll(url).then((response) => {
      if (
        response.data &&
        response.data.districts &&
        response.data.districts.length > 0
      ) {
        let dists = [];
        response.data.districts.map((d) =>
          dists.push({
            value: d.district_id,
            label: d.district_name,
          })
        );
        setDistricts(dists);
      }
    });
  };

  const loadVaccinationCenters = () => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");
    let districtNumber = selectedDistrict;
    const url = `${searchByDistUrl}?district_id=${districtNumber}&date=${todaysDate}`;
    DashboardService.getAll(url)
      .then((response) => {
        if (
          response.data &&
          response.data.centers &&
          response.data.centers.length > 0
        ) {
          let centers = response.data.centers;
          let availableCenters = [];
          _.forEach(centers, function (value) {
            let availableSessions = [];
            if (value.sessions) {
              _.forEach(value.sessions, function (session) {
                if (
                  session &&
                  session.available_capacity &&
                  parseInt(session.available_capacity) > 0
                ) {
                  availableSessions.push(session);
                }
              });
            }
            if (availableSessions.length > 0) {
              value.sessions = availableSessions;
              availableCenters.push(value);
            }
          });
          setAvailableCentreDetails(availableCenters);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const onStateChange = (e) => {
    if (e && e.value && e.value >= 0) {
      loadDistricts(e.value);
    }
  };

  const onDistrictChange = (e) => {
    if (e && e.value && e.value >= 0) {
      setSelectedDistrict(e.value);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    loadVaccinationCenters();
  };

  useEffect(() => {
    loadStates();
  }, []);

  return (
    <main role="main" className="container">
      <h1 className="mt-5">Search Vaccination Centre</h1>
      <Container fluid="md">
        <Row>
          <Col>
            <Select
              isClearable
              name="State"
              options={indiaStates}
              onChange={onStateChange}
            />
          </Col>
          <Col>
            <Select
              isClearable
              name="District"
              options={districts}
              onChange={onDistrictChange}
            />
          </Col>
          <Col>
            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleSearch : null}
            >
              {isLoading ? "Loading…" : "Search Vaccine Center"}
            </Button>
          </Col>
        </Row>
      </Container>
      {availableCentreDetails && availableCentreDetails.length > 0 ? (
        <VaccineCenters availableCentreDetails={availableCentreDetails} />
      ) : (
        <div></div>
      )}
    </main>
  );
}

export default Dashboard;
