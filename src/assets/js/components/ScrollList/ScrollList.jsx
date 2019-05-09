import React from 'react';

const ScrollList = ({ items, mapFn, height }) => (
  <ul className="scroll-list" style={{ height: height || '20rem' }}>
    {items.map(mapFn)}
  </ul>
);

export default ScrollList;
