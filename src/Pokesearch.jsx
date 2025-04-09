import { useState, useEffect } from "react";
import Autocomplete from "./Autocomplete"; // Importamos el componente de autocompletar

function Pokesearch() {
  const baseURL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokeName, setPokeName] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(""); // Para el mensaje de error

  const handlePokemonSelect = (name) => {
    setPokeName(name); // Actualizar el estado con el nombre del Pokémon seleccionado
  };

  useEffect(() => {
    if (!pokeName) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(`${baseURL}${pokeName}`);
        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }

        const data = await response.json();
        setPokemonData(data); // Guardamos los datos del Pokémon
        setErrorMsg(""); // Limpiamos cualquier mensaje de error
      } catch (error) {
        setPokemonData(null); // Limpiar si no se encuentra
        setErrorMsg("Pokémon no encontrado. Intenta de nuevo.");
      }
    };

    fetchPokemon();
  }, [pokeName]);

  return (
    <div className="container-fluid px-0">
      {/* Barra de búsqueda */}
      <div
        className="bg-danger container-fluid d-flex justify-content-center align-items-center text-light py-2"
        style={{ height: 60 }}
      >
        <img
          src="../public/pokeball.svg"
          alt="pokeball"
          style={{ height: "50px", width: "50px" }}
        />
        <h1 className="text-light mx-2">Pokedex</h1>
        <Autocomplete onSelectPokemon={handlePokemonSelect} />
      </div>

      {/* Mensaje de error */}
      {errorMsg && (
        <div className="alert alert-warning text-center mt-3">{errorMsg}</div>
      )}

      {/* Solo renderizamos el Pokémon si tenemos datos */}
      {pokemonData && (
        <div className="container-fluid d-flex justify-content-center my-5">
          <div
            className="card"
            style={{ width: "18rem", border: "2px solid red" }}
          >
            <img
              src={pokemonData.sprites.other.dream_world.front_default}
              className="card-img-top"
              alt="pokemon-image"
            />
            <div className="card-body bg-dark text-light border-danger">
              <h5 className="card-title">{pokemonData.name}</h5>
              <p className="card-text">
                <strong>
                  His ID is {pokemonData.id} and his type is{" "}
                  {pokemonData.types[0].type.name}
                </strong>
              </p>
            </div>
            <ul className="list-group list-group-flush">
              {pokemonData.stats.map((statobj) => (
                <li
                  className="list-group-item text-light bg-dark m-0 border-danger"
                  key={statobj.stat.name}
                >
                  <strong>
                    {statobj.stat.name}: {statobj.base_stat}
                  </strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokesearch;
