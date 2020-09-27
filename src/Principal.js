import React, { useState, useEffect } from 'react';

import './App.css';
import { Grid, Search, Button, Card } from 'semantic-ui-react'
import Cards from './Cards';



function Principal() {
  const [personagemData, setPersonagemData] = useState({});
  const [MundoData, setMundoData] = useState({});
  const [filter, setFilter] = useState("");
  const [filterMundo, setFilterMundo] = useState("");
  const novoPersonagem = {};
  const novoMundo = {};


  useEffect(() => {
    fetch('https://cors-anywhere.herokuapp.com/https://dragon-ball-api.herokuapp.com/api/character')
      .then(res => res.json())
      .then(data => {


        data.forEach((personagem, index) => {
          novoPersonagem[index + 1] = {
            id: personagem._id,
            name: personagem.name,
            mundo: personagem.originPlanet,
            pesquisa: personagem.name.toUpperCase()

          };
        });

        setPersonagemData(novoPersonagem)



      });

    fetch('https://cors-anywhere.herokuapp.com/https://dragon-ball-api.herokuapp.com/api/planet')
      .then(res => res.json())
      .then(data => {


        data.forEach((mundo, index) => {
          novoMundo[index + 1] = {
            id: mundo._id,
            name: mundo.name,


          };
        });

        setMundoData(novoMundo)



      });

  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);

    console.log(e.target.value.toUpperCase())
  };


  const getMundoCard = (MundoID) => {
    const { name } = MundoData[MundoID];
    return (
      <Button onClick={() => PesquisarMundo(name)} >{name}</Button>
    );
  };

  const PesquisarMundo = (name) => {
    setFilterMundo(name);

  }





  return (
    <div className="EstiloGrid">
      <Grid  >
        <Grid.Row className="navbar">
          <Grid.Column centered width={3}>
            <Search
              placeholder='Procure'
              onSearchChange={handleSearchChange}
            />
          </Grid.Column>

        </Grid.Row>
        <Grid.Row >

          <Grid.Column className="CardCartoes" width={12}>

            <Card.Group centered itemsPerRow={4}>

              {Object.keys(personagemData).map(


                (id) =>
                  personagemData[id].pesquisa.includes(filter) &&
                  personagemData[id].mundo.includes(filterMundo) &&
                  <Cards {...personagemData[id]} />


              )}


            </Card.Group>
          </Grid.Column>



          <Grid.Column width={4}>
            <Card centered>


              <Button.Group vertical>
                <Button onClick={() => PesquisarMundo('')} >Todos</Button>
                {Object.keys(MundoData).map(
                  (id) =>

                    getMundoCard(id)

                )}

              </Button.Group>
            </Card>
          </Grid.Column>
        </Grid.Row>


      </Grid>
    </div>
  );
}

export default Principal;


