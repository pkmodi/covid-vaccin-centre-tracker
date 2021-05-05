import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function VaccineCenters(props) {
  const { availableCentreDetails } = props;
  //   let rowCount =
  //     availableCentreDetails && availableCentreDetails.length > 0
  //       ? Math.ceil(availableCentreDetails.length / 3)
  //       : 1;

  return (
    <Container fluid="md">
      {availableCentreDetails && availableCentreDetails.length > 0 ? (
        availableCentreDetails.map((r, rowIndex) => {
          if (rowIndex % 3 === 0) {
            return (
              <Row key={rowIndex}>
                {availableCentreDetails.map((s, colIndex) => {
                  if (
                    colIndex === rowIndex ||
                    colIndex === rowIndex + 1 ||
                    colIndex === rowIndex + 2
                  ) {
                    return (
                      <Col key={colIndex} md={4}>
                        <Card>
                          <Card.Header>
                            {s.name} - {s.fee_type}
                          </Card.Header>
                          <Card.Body>
                            <Card.Title>
                              {s.address} - {s.pincode}
                            </Card.Title>
                            {
                              s.sessions && s.sessions.length > 0 && (
                                //s.sessions.map((se) => (
                                <Card.Text>
                                  <span>Date: </span> {s.sessions[0].date}
                                  <br />
                                  <span>Age Limit: </span>
                                  {s.sessions[0].min_age_limit}
                                  <br />
                                  <span>Available Capacity: </span>
                                  {s.sessions[0].available_capacity}
                                </Card.Text>
                              )
                              //))
                            }
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            );
          }
        })
      ) : (
        <Row></Row>
      )}
    </Container>
  );
}
