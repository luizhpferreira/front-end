import React, { Component } from 'react';
import HotelForm from './components/HotelForm'; // Importe o componente HotelForm
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CadastroUsuario from './components/CadastroUsuario';
import Login from './components/LoginForm';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1 style={{ marginLeft: '84vh' }}>Cadastro de Hotéis</h1>
          <div style={{ marginLeft: '84vh' }}>Bem-vindo ao Site de Cadastro de Hoteis</div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={CadastroUsuario} />
            <Route path="/hoteis" component={HotelForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
