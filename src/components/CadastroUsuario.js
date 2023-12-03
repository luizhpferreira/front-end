import React, { Component } from 'react';
import axios from 'axios';



class CadastroUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      email: '',
      telefone: '',
      cadastroSucesso: false,
      senhaNaoCoincide: false
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleconfirm_passwordChange = (event) => {
    this.setState({ confirm_password: event.target.value });
  }

  handleemailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handletelefoneChange = (event) => {
    this.setState({ telefone: event.target.value });
  }

  



  
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, confirm_password, email, telefone } = this.state;

    if (password !== confirm_password) {
      this.setState({ senhaNaoCoincide: true });
      return; 
    }

    // Enviar os dados de cadastro para o servidor Flask usando uma solicitação POST
    axios.post('http://localhost:5000/usuarios', {
      username: username,
      password: password,
      confirm_password: confirm_password,
      email: email,
      telefone: telefone,
    })
    .then((response) => {
      console.log(response.data);
      this.setState({ cadastroSucesso: true });
      setTimeout(() => {
        // Redirecionar para a página de login
        this.props.history.push('/login'); // Certifique-se de que o componente está dentro de uma rota para usar this.props.history
        
        // Chamar onCadastroSucesso se for uma função válida
        if (typeof this.props.onCadastroSucesso === 'function') {
          this.props.onCadastroSucesso();
        }
      }, 3000);
      
      // Redirecionar ou fazer algo com a resposta do servidor, por exemplo, mostrar uma mensagem de sucesso
      
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
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={this.state.confirm_password} onChange={this.handleconfirm_passwordChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={this.state.email} onChange={this.handleemailChange} />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="telefone" value={this.state.telefone} onChange={this.handletelefoneChange} />
          </div>
          <button type="submit">Cadastrar</button>
          {this.state.senhaNaoCoincide && <p>A senha deve conter os mesmos caracteres</p>}
          {this.state.cadastroSucesso && <p>Cadastro feito com sucesso!</p>}
        </form>
      </div>
    );
  }
}

export default CadastroUsuario;
