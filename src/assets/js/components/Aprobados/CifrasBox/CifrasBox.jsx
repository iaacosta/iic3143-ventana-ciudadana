import React from 'react';

export const CifrasBox = ({ cifra, label, estado }) => (
  <div className="cifras__box">
    <p className={`cifras__cifra cifras__cifra--${estado}`}>{cifra}</p>
    <p className="cifras__box-label">{label}</p>
  </div>
);

export default CifrasBox;
