import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";

function App() {
  const [characters, setCharacters] = useState([]); // Retorna el estado y la funcion que modifica el estado
  const [info, setInfo] = useState({});
  const Initialurl = "https://rickandmortyapi.com/api/character";
  const fetchCharacters = (url) => {
    // Esta funcion hace la llamada de red
    fetch(url) // Hace una request a la api para llamar los personajes
      .then((response) => response.json()) // convierte a json
      .then((data) => {
        setCharacters(data.results); // trae los datos
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };

  const onPrevious = () => {
    fetchCharacters(info.prev); // hace una llamada de red a la url info.prev
  };

  const onNext = () => {
    fetchCharacters(info.next); // hace una llamada de red a la url info.next
  };

  useEffect(() => {
    // Se controla mediante un useEffect
    fetchCharacters(Initialurl);
  }, []);

  return (
    <>
      <Navbar brand="Rick and Morty App" />

      <div className="container mt-5">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
        <Characters characters={characters} />
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
    </>
  );
}

export default App;
