import React from 'react';

const HotelList = ({ hoteis, onExcluirHotel }) => {
  // Função para excluir um hotel com base no hotelId
  const handleExcluirHotel = (hotelId) => {
    // Chame a função passada pelo componente pai (HotelForm) para excluir o hotel
    onExcluirHotel(hotelId);
  };

  return (
    <ul>
      {hoteis.map((hotel) => (
        <li key={hotel.hotel_id}>
          {hotel.nome} ({hotel.hotel_id})
          {/* Botão para excluir um hotel */}
          <button onClick={() => handleExcluirHotel(hotel.hotel_id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};

export default HotelList;
