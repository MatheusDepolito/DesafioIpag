import React from "react";
import MainContainer from "./Components/MainContainer";
import { Container } from 'react-bootstrap';

export default function App() {
    return (
        <Container fluid className="d-flex vh-100 flex-column">
            <MainContainer/>
        </Container>
    )
}
