import React from 'react';

const Senador = ({ data }) => {
  const { nombreCompleto, partido, email } = data;
  return (
    <div style={{ textAlign: 'left' }}>
      <h3 style={{ marginBottom: '.2rem' }}>{nombreCompleto}</h3>
      <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>{email}</span>
      <span style={{ fontSize: '1.5rem' }}>{partido}</span>
    </div>
  );
};

export default Senador;
