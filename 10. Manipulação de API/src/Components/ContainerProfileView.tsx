import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function ContainerProfileView({ userData, onRepositoriesDataUpdate }) {
    const [repositories, setRepositories] = useState([]); 
    const [showButton, setShowButton] = useState(false); // estado do botao se esta visivel ou nao

    useEffect(() => {
        if(userData) {
            fetchRepositories(userData.login)
        }
    }, [userData]);
    
    // Deixa botão visivel
    useEffect(() => {
        if (userData) {
            setShowButton(true);
        }
    }, [userData]);

    // Faz a requisicao get para buscar os repositorios
    function fetchRepositories(username) {
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                setRepositories(response.data);
                //console.log(response.data)

                onRepositoriesDataUpdate(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar repositórios:', error);
            });
    }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
      <div>
        {userData && (
          <div>
            <img
              src={userData.avatar_url}
              alt="Avatar"
              style={{ maxWidth: '45%', maxHeight: '35%' }}
            />
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
          </div>
        )}


      </div>
    </div>
  );
}