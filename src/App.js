import React, { useState,useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {

  // state de la app

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  
  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '8272475-1276ad683e45d6c4bbb563af4';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);
      
      // calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);
    
    }

    consultarAPI();

  }, [busqueda])

  // definir la pagina anterior

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    
    if (nuevaPaginaActual === 0) return; 

    setPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    
    if(nuevaPaginaActual > totalPaginas) return;

    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >Anterior &laquo;</button>

        <button
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        >Siguiente &raquo;</button>
      </div>
    </div>
  );
}

export default App;
