import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { debounce } from '../../utility/helper';
import { useNavigate } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = debounce((query) => {
    setDebouncedSearchQuery(query);
  }, 500); // Adjust the delay as needed

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      handleSearch(query);
    } else {
      setDebouncedSearchQuery(''); // Clear the search if less than 3 characters
    }
  };

  const handleItemClick = (id: string, name: string) => {
    navigate(`/pokemon/item-details?id=${id}&name=${name}`);
  };  


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon</div>;

  // Filter Pokémon based on search query
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={handleInputChange}
        className={classes.searchInput}
      />
      {
        filteredPokemons.length === 0 ? <div className={classes.noResults}>No results found</div> :
        <ul className={classes.list}>
          {filteredPokemons.map((pokemon) => (
            <li key={pokemon.id} className={classes.listItem} onClick={() => handleItemClick(pokemon.id, pokemon.name)}>
              <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
              <div className={classes.info}>
                <h3 className={classes.details}>{pokemon.name}</h3>
                <p className={classes.details}>#{pokemon.id}</p>
                <p className={classes.details}>Types: {pokemon.types.join(', ')}</p>
              </div>
            </li>
          ))}
      </ul>
      }

    </div>
  );
};

const useStyles = createUseStyles(
  {
    searchInput: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      marginBottom: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      color: '#000',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexWrap: 'wrap',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      margin: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      width: 'calc(50% - 10px)', // Each item takes 50% width minus margin
      boxSizing: 'border-box', // Include padding and border in the element's total width and height
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    image: {
      width: '100px',
      height: '100px',
      marginRight: '10px',
    },
    info: {
      flex: 1,
      paddingLeft: '30px',
    },
    details: {
      color: '#000',
      fontSize: '14px',
      margin: '0',
    },
    noResults: {
      color: '#000',
      fontSize: '14px',
      margin: '0',
    },
  },
  { name: 'PokemonList' }
);
