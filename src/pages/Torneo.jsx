/*import bgtorneo from '../assets/img/torneo.png';*/
import Header from '../components/layout/Header';
import { useState, useEffect } from 'react';

export default function Torneo() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="p-4">
        <h1 className="text-xl font-bold"></h1> <img src={'https://www.shutterstock.com/shutterstock/photos/1717544038/display_1500/stock-photo--d-man-worker-work-in-progress-1717544038.jpg'} alt="Imagen de perfil" />
      </div>;

    </>)
}