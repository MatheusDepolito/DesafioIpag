import React, { useState, useEffect } from "react";

export default function ContainerRepos({ repositoriesData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = repositoriesData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(repositoriesData.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1); // Resetar para a página 1 quando a lista de repositórios mudar
  }, [repositoriesData]);

  return (
    <div className="d-flex flex-column align-items-center" style={{ width: '100%', height: '100%' }}>
      {currentItems.length > 0 ? (
        <ul className="list-group" style={{ width: '100%' }}>
          {currentItems.map(repo => (
            <li key={repo.id} className="list-group-item" style={{ minHeight: '100px' }}>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <p>Linguagem: {repo.language}</p>
              <p>Estrelas: {repo.stargazers_count}</p> 
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
      <nav aria-label="Pagination" className="mt-3">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePagination(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
