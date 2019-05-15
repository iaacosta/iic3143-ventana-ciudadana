import React from 'react';

const ScrollList = ({ items, mapFn, height }) => {
  const isEmpty = items.length === 0;
  const placeholder = (
    <p className="scroll-list__no-items">No hay registros disponibles</p>
  );
  return (
    <ul
      className="scroll-list"
      style={{ height: (isEmpty && '8rem') || height || '20rem' }}
    >
      {!isEmpty ? items.map(mapFn) : placeholder}
    </ul>
  );
};

export default ScrollList;
