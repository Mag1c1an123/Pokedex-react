import { useState, useEffect } from "react";

function Autocomplete({ onSelectPokemon }) {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [query, setQuery] = useState("");

  // Obtener todos los nombres de los Pokémon
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const data = await response.json();
        const names = data.results.map((pokemon) => pokemon.name);
        setAllPokemonNames(names);
      } catch (error) {
        console.error("Error al obtener los nombres de los Pokémon:", error);
      }
    };

    fetchPokemonNames();
  }, []);

  // Filtrar los nombres según lo que escribe el usuario
  const handleInputChange = (e) => {
    const inputText = e.target.value.toLowerCase();
    setQuery(inputText);

    if (inputText) {
      const filtered = allPokemonNames.filter((name) =>
        name.toLowerCase().includes(inputText)
      );
      setFilteredNames(filtered);
    } else {
      setFilteredNames([]);
    }
  };

  // Cuando un usuario selecciona un Pokémon
  const handleSuggestionClick = (name) => {
    onSelectPokemon(name); // Pasamos el nombre al componente principal
    setFilteredNames([]); // Limpiar las sugerencias
    setQuery(name); // Establecer el nombre como el valor del input
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search a Pokémon"
        className="form-control"
        onFocus={(e) => {
          e.target.style.boxShadow = "0 0 0 3px rgba(15, 5, 5, 0.5)";
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = "none";
        }}
      />
      {filteredNames.length > 0 && (
        <ul
          className="list-group mt-2"
          style={{
            position: "absolute",
            top: "100%", // debajo del input
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredNames.map((name) => (
            <li
              key={name}
              className="list-group-item"
              onClick={() => handleSuggestionClick(name)}
              style={{ cursor: "pointer" }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
