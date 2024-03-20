import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import ContainerForm from "./ContainerForm";
import ContainerProfileView from "./ContainerProfileView";
import ContainerRepos from "./ContainerRepos";

export default function MainContainer() {
    const [userData, setUserData] = useState(null);
    const [repositoriesData, setRepositoriesData] = useState([])

    const handleRepositoriesDataUpdate = (repositoriesData) => {
        setRepositoriesData(repositoriesData)
    }

    const handleUserDataUpdate = (userData) => {
        setUserData(userData);
      };


  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '50%' }}>
      <Col className="d-flex flex-column h-100">
        <Row className="h-50">
          <Col className="p-0">
            <Container id="ContainerLeftTop" className="h-100">
              <ContainerForm onUserDataUpdate={handleUserDataUpdate} />
            </Container>
          </Col>
          <Col className="p-0">
            <Container id="ContainerRightTop" className="h-100">
              <ContainerProfileView  onRepositoriesDataUpdate={handleRepositoriesDataUpdate}  userData={userData} />
            </Container>
          </Col>
        </Row>
        <Row className="h-50">
          <Col className="p-0">
            <Container id="ContainerBottom" className="h-100">
              <ContainerRepos repositoriesData={repositoriesData} />
            </Container>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}
