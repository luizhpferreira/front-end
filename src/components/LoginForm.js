import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginSucesso: false
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
  
    // Enviar dados de login para o servidor Flask usando uma solicitação POST
    axios.post('http://localhost:5000/login', {
      username: username,
      password: password,
    })
    .then((response) => {
      //console.log(response.data);
      const token = response.data.access_token;
      this.setState({ loginSucesso: true, username: '', password: '' });
      // Armazene o token no localStorage
      localStorage.setItem("token", token);
      this.props.history.push('/hoteis');
      
      
  
      // Agora, você pode redirecionar ou fazer outras ações com o token
      // Exemplo: this.props.history.push('/alguma-rota');
    })
    .catch((error) => {
      console.error(error);
    });
  }
  

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
          {this.state.loginSucesso && <p>Login feito com sucesso!</p>}
        </form>
      </div>
    );
  }
}

export default Login;
