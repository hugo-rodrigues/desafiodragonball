import React from 'react';

import './App.css';
import { Grid, Search, Button, Card } from 'semantic-ui-react'


function Cards(props) {
  
    const {  name, mundo } = props;
    return (
      <Card>
        <Card.Content>

          <Card.Header>{name}</Card.Header>
          <Card.Meta>Planeta: {mundo}</Card.Meta>

        </Card.Content>

      </Card>
    );
 
}

export default Cards;
