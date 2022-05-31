import * as React from 'react';
import { AppIndex } from './AppIndex';

//Punto inicial de la App. 
// Carga el componente AppIndex para identificar si el usuario tiene acceso a twiBot 
// y devolver determinados componentes en función de ello.
const App = () => {
  return(
    <AppIndex/>
  )
}

export default App;
