import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col>
            <h1>Footer Text</h1>
          </Col>
        </Row>
        <Row>
          <p>Copyright © {new Date().getFullYear()} Banga & Co</p>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
