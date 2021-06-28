//para consumir las apis es con useEffect y useState
import React, { useEffect, useState } from 'react';
//importamos la libreria para el envio de rutas o los paths
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Practica from './components/prueba';
import PrimeraPagina from './components/primeraPagina';
import CategoriasPagina from './components/segundaPagina';
import Usuarioinfo from './components/Usuario';

import ObtenerProducto from './components/producto';

import Axios from './config/axios';



function App() {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const [Usuarios, guardaUsuarios] = useState([]);
    const [Categorias, guardarCategorias] = useState([]);
    const [Productos, guardarProductos] = useState([]);
    const [consulta, guardarConsulta] = useState(true);
    //useEffect es un funcion que se ejecuta cuando hay cambios en el programa 
    useEffect(() => {
        //Creamos un useState para que se recargue la pagina cada vez que insertamos algo 
        if (consulta) {
            //consultamos la url ya no ponemos el local host por que ya la tenemos en una varible global
            const consultarApi = () => {
                Axios.get('http://localhost:8080/Api/Usuarios')
                    .then(respuesta => {
                        guardaUsuarios(respuesta.data);
                        // lo cambiamos en falso para no que no recargue la pagina
                        guardarConsulta(false);
                    })
                    .catch(err => console.log(err))
            }


            //Consultamos en la ruta categoria de nuestra api
            const ConsultarCategorias = () => {

                Axios.get('http://localhost:8080/Api/categorias')
                    .then((response) => {

                        guardarCategorias(response.data);

                    })
                    .catch(err => console.log(err));

            }
            const ConsultarProductos = () => {
                Axios.get('http://localhost:8080/Api/productos')
                    .then((response) =>

                        guardarProductos(response.data)
                    )
                    .catch(err => console.log(err))
            }

            ConsultarProductos();
            ConsultarCategorias();
            consultarApi();
        }
    }, [consulta]);
    //de eciamos en consulata en corchetes que cuando ese cambie este atento y vuelva a ejecutar ese codigo para eso es el

    return ( <
            Router >
            <
            Switch >
            <
            Route
            //utilizamos route para hacer el link o url de nuestro programas debemos crear los componentes de cada pagina que vamos a llamar
            //Asi se pasa la informacion que estemos consumiendo una api se pasa cuando quieras pasar useState o funcion se debe usar esta sintaxis
            exact path = '/'
            component = {
                () => < Practica
                Usuarios = { Usuarios }
                />}

                /
                >

                <
                Route
                exact path = '/CrearUsuario'
                component = {
                    () => < PrimeraPagina
                    guardarConsulta = { guardarConsulta }
                    />} /
                    >

                    <
                    Route
                    exact path = '/Categorias'
                    component = {
                        () => < CategoriasPagina
                        Categorias = { Categorias }

                        />} /
                        >
                        <
                        Route
                        exact path = '/Productos'
                        component = {
                            () => < ObtenerProducto
                            Productos = { Productos }



                            />}

                            /
                            >
                            <
                            Route
                            exact path = '/Usuario/:id'
                            component = { Usuarioinfo }


                            /> <
                            /Switch>


                            <
                            /Router>



                        );
                    }

                    export default App;
                    //debemos instalar axios para hacer las peticiones ala api y obtener la informacion de la base de datos 
                    //npm install axios