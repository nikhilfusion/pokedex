import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { usePokemonDetails } from '../hooks/useGetPokemons';

export const PokemonDetails = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const pokemonId = new URLSearchParams(location.search).get('id');
  const pokemonName = new URLSearchParams(location.search).get('name');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showImageModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { loading, error, pokemon } = usePokemonDetails(pokemonId, pokemonName);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details</div>;

  console.log("pokemon", pokemon);
    return(
      <div className={classes.container}>
         
        <h1 className={classes.title}>{pokemon.name}</h1>
        <div className={classes.detailsContainer}>
          <div className={classes.imageContainer}>
            <img src={pokemon.image} alt={pokemon.name} className={classes.image} onClick={showImageModal}  />
          </div>
          <div className={classes.details}>
            <p><strong>Number: </strong> {pokemon.number}</p>
            <p><strong>Weight: </strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
            <p><strong>Height: </strong> {pokemon.height.minimum} - {pokemon.height.maximum}</p>
            <p><strong>Classification: </strong> {pokemon.classification}</p>
            <p><strong>Types: </strong> {pokemon.types.join(', ')}</p>
            <p><strong>Resistant: </strong> {pokemon.resistant.join(', ')}</p>
            <p><strong>Weaknesses: </strong> {pokemon.weaknesses.join(', ')}</p>
            <p><strong>Flee Rate: </strong> {pokemon.fleeRate}</p>
            <p><strong>Max CP: </strong> {pokemon.maxCP}</p>
            <p><strong>Max HP: </strong> {pokemon.maxHP}</p>
          </div>
        </div>
        <Button type="primary" onClick={() => navigate('/pokemon')} className={classes.backButton}>
        Back to Pokemon List
      </Button>
        <Modal
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          className={classes.modal}
      >
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '100%' }} />
      </Modal>
      </div>
    )   
};

const useStyles = createUseStyles(
  {
    container: {
      padding: '20px',
      textAlign: 'center',
    },
    backButton: {
      marginBottom: '20px',
    },
    title: {
      marginBottom: '20px',
    },
    detailsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
    imageContainer: {
      width: '40%',
      minWidth: '400px',
    },  
    image: {
      width: '400px',
      marginRight: '20px',
      cursor: 'pointer',
      objectFit: 'contain',
    },
    details: {
      width: '60%',
      textAlign: 'left',
      minWidth: '400px',
    },
    modal: {
      width: '100%',
      height: '100%',
    },
    '@media (max-width: 768px)': {
      detailsContainer: {
        flexDirection: 'column', // Stack items vertically on smaller screens
        alignItems: 'center',
      },
      imageContainer: {
        width: '100%', // Full width for the image on small screens
        marginBottom: '20px', // Add some space below the image
      },
      details: {
        width: '100%', // Full width for details on small screens
        textAlign: 'center', // Center text on small
      },
    }
  },
  { name: 'PokemonDetails' }
);
