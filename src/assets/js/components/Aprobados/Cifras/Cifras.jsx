import React from 'react';

export const Cifras = ({ aprobados, noAprobados }) => (
  <>
    <div className="cifras__box">
      <p className="cifras__cifra cifras__cifra--aprobado">{aprobados}</p>
      <p className="cifras__box-label">Proyectos aprobados</p>
    </div>
    <div className="cifras__box">
      <p className="cifras__cifra cifras__cifra--no-aprobado">{noAprobados}</p>
      <p className="cifras__box-label">Proyectos no aprobados</p>
    </div>
  </>
);

export default Cifras;
