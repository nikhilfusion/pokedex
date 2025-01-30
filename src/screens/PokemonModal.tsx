import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { Modal, Typography, Row, Col, Image, Spin } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { usePokemonDetails } from '../hooks/useGetPokemons';

const {  Text } = Typography;

export const PokemonModal = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const pokemonId = new URLSearchParams(location.search).get('id');
  const pokemonName = new URLSearchParams(location.search).get('name');

  // Fetch Pokémon details using GraphQL
  const { loading, error, pokemon } = usePokemonDetails(pokemonId, pokemonName);
  console.log("pokemon", pokemon);
  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/pokemon'); // Navigate back to the list when the modal is closed
  };

  if (loading) return <Spin size="large" className={classes.loading}/>;
  if (error) return <Text type="danger">Error fetching Pokémon details.</Text>;


  return (
    <Modal
      title={<span className={classes.modalHeader}>{pokemon?.name}</span>}
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
      closeIcon={<CloseOutlined className={classes.closeButton} />}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className={classes.imageContainer}>
            <Image
              src={pokemon?.image}
              alt={pokemon?.name}
              width={250}
              height={250}
              preview={false}
            />
          </div>

        </Col>
        <Col span={12}>
        <div className={classes.details}>
            <p className={classes.detailsText}><strong>Number:</strong> {pokemon?.number}</p>
            <p className={classes.detailsText}><strong>Weight:</strong> {pokemon?.weight.minimum} - {pokemon?.weight.maximum}</p>
            <p className={classes.detailsText}><strong>Height:</strong> {pokemon?.height.minimum} - {pokemon?.height.maximum}</p>
            <p className={classes.detailsText}><strong>Classification:</strong> {pokemon?.classification}</p>
            <p className={classes.detailsText}><strong>Types:</strong> {pokemon.types.join(', ')}</p>
            <p className={classes.detailsText}><strong>Resistant:</strong> {pokemon.resistant.join(', ')}</p>
            <p className={classes.detailsText}><strong>Weaknesses:</strong> {pokemon.weaknesses.join(', ')}</p>
            <p className={classes.detailsText}><strong>Flee Rate:</strong> {pokemon.fleeRate}</p>
            <p className={classes.detailsText}><strong>Max CP:</strong> {pokemon.maxCP}</p>
            <p className={classes.detailsText}><strong>Max HP:</strong> {pokemon.maxHP}</p>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

const useStyles = createUseStyles(
  {
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '22px',
      fontWeight: 600,
      color: '#304a19',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    details: {
      textAlign: 'left',
      color: '#000',
    },
    detailsText: {
      color: '#000',
      '& strong': {  // Add this to target strong elements inside details
        color: 'red',
        fontWeight: 'bold',
      }
    },
    closeButton: {
      color: '#000',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      backgroundColor: '#000',
  
      '&:hover': {
        color: '#ff4d4f', // Custom hover color
        transform: 'scale(1.2)',
      }
    },
  }
);

