import React, { Component } from 'react';
import axios from 'axios';


class CadastroUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    // Enviar os dados de cadastro para o servidor Flask usando uma solicitação POST
    axios.post('http://localhost:5000/usuarios', {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log(response.data);
      // Redirecionar ou fazer algo com a resposta do servidor, por exemplo, mostrar uma mensagem de sucesso
      this.props.onCadastroSucesso();
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default CadastroUsuario;
