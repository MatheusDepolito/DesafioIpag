import React, { useState } from "react";
import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function ContainerForm({ onUserDataUpdate }) {
  const [user, setUser] = useState('');
  const [validated, setValidated] = useState(false); // Estado de validacao se foi digitado ou nao o usuario
  const [userNotFound, setUserNotFound] = useState(false); // Estado para verificar se o usuario nao foi encontrado

  function handleSubmit(e) {
    e.preventDefault();

    if (user.trim() === '') {
      setValidated(true); // Atualiza o estado para mostrar a mensagem de feedback
      setUserNotFound(false); // Reseta o estado de usuario nao encontrado
    } else {
      setValidated(false); // Reseta o estado de validação

      // Faz a requisicao get para buscar o usuario
      axios.get(`https://api.github.com/users/${user}`)
        .then(response => {
          // Se o usuario e econtrado limpa o estado de nao encontrado
          setUserNotFound(false);

          onUserDataUpdate(response.data);
          //console.log(response.data);
        })
        .catch(error => {
          // Se o usuario nao for encontrado atualiza o estado para usuario nao encontrado
          setUserNotFound(true);
          console.error('Erro ao buscar usuário:', error);
        });
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
      <Card className="text-center" style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="mb-4">Procurar usuário do GitHub</Card.Title>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCodigo">
                <Form.Control
                  type="text"
                  placeholder="Nome do usuário"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  isInvalid={validated && user === ""}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe o nome do usuário.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {userNotFound && (
              <Alert variant="danger" className="mt-3">
                O usuário nao foi encontrado.
              </Alert>
            )}

            <Button className="mt-3" variant="primary" type="submit">
              Procurar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
