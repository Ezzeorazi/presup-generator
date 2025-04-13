// components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-light py-3 mt-4 border-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted m-0">&copy; {new Date().getFullYear()} Presupuesto Vigi. Todos los derechos reservados.</p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;