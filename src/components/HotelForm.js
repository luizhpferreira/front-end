import React, { Component } from 'react';
import axios from 'axios';



class HotelForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeHotel: '',
      estrelas: '',
      diaria: '',
      cidade: '',
    };
  }

  // Manipuladores de evento para atualizar o estado com os dados inseridos
  handleNomeHotelChange = (event) => {
    this.setState({ nomeHotel: event.target.value });
  }

  handleEstrelasChange = (event) => {
    this.setState({ estrelas: event.target.value });
  }

  handleDiariaChange = (event) => {
    this.setState({ diaria: event.target.value });
  }

  handleCidadeChange = (event) => {
    this.setState({ cidade: event.target.value });
  }

  // Manipulador de evento para enviar os dados do hotel ao servidor Flask
  handleSubmit = (event) => {
    event.preventDefault();
    const { nomeHotel, estrelas, diaria, cidade } = this.state;



    // Enviar os dados do hotel ao servidor Flask usando uma solicitação POST
    axios
      .post(`http://localhost:5000/hoteis/${nomeHotel}`, {

        nome: nomeHotel,
        estrelas: estrelas,
        diaria: diaria,
        cidade: cidade,
      })
      .then((response) => {
        // Lide com a resposta do servidor conforme necessário
        console.log(response.data);

        // Limpe o estado após o envio do formulário
        this.setState({
          nomeHotel: '',
          estrelas: '',
          diaria: '',
          cidade: '',
        });
      })
      .catch((error) => {
        // Lide com erros de solicitação conforme necessário
        console.error(error);
      });
  }

  componentDidMount() {
    // Faça uma solicitação GET para obter a lista de hotéis do servidor Flask
    axios.get('http://localhost:5000/hoteis')
      .then(response => {
        this.setState({ hoteis: response.data.hoteis });
      })
      .catch(error => {
        console.error(error);
      });
  }



  handleEditarHotel = (hotel) => {
    // Definir o estado para abrir o formulário de edição e preenchê-lo com os detalhes do hotel
    this.setState({ hotelParaEditar: hotel });
  }



  



  render() {
    return (

      <div>
        <h2>Formulário de Hotel</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nome do Hotel:</label>
            <input
              type="text"
              value={this.state.nomeHotel}
              onChange={(e) => this.setState({ nomeHotel: e.target.value })}
            />
          </div>
          <div>
            <label>Estrelas:</label>
            <input
              type="number"
              value={this.state.estrelas}
              onChange={(e) => this.setState({ estrelas: e.target.value })}
            />
          </div>
          <div>
            <label>Diária:</label>
            <input
              type="number"
              value={this.state.diaria}
              onChange={(e) => this.setState({ diaria: e.target.value })}
            />
          </div>
          <div>
            <label>Cidade:</label>
            <input
              type="text"
              value={this.state.cidade}
              onChange={(e) => this.setState({ cidade: e.target.value })}
            />
          </div>
          <button type="submit">Adicionar Hotel</button>
        </form>
      </div>
    );
  }
}

export default HotelForm;


