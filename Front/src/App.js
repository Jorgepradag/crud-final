import { useState } from 'react';
import './App.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState("");
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState("");
  const [id,setId] = useState("0");

  const [editar,setEditar] = useState(false);

  const [empleadosList,setEmpleados] = useState([]);

  const add = ()=>{ 
    Axios.post("http://localhost:3001/create", {
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con éxito!!!</i>",
        icon: 'success',
        timer:3000
      })
    })
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update", {
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
     limpiarCampos();
     Swal.fire({
      title: "<strong>Actualización exitosa!</strong>",
      html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con éxito!!!</i>",
      buttons:["SI","NO"],
      icon: 'success',
      timer:3000
    })
    })
  }
  const deleteEmpleado = (val)=>{

    Swal.fire({
      title: 'Confirmar eliminado?',
      html: "<i>Desea eliminar a <strong>"+val.nombre+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`,).then(()=>{
          getEmpleados();
          limpiarCampos();
          Swal.fire(
          'Eliminado!',
          val.nombre+' fue eliminado.',
          'success'
        )
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logro eliminar el empleado',
          footer: error.AxiosError
        })
      });

        
      }
    });
    
  }

    const limpiarCampos =()=>{
      setAnios("");
      setNombre("");
      setCargo("");
      setPais("");
      setEdad("");
      setId("");
      setEditar(false);
    }


    const editarEmpleado = (val)=>{
      setEditar(true);

      setNombre(val.nombre);
      setEdad(val.edad);
      setCargo(val.cargo);
      setPais(val.pais);
      setAnios(val.anios);
      setId(val.id);

    }



  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }





  return (
    <div className="container">
    
          <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre: </span>
          <input type="text" 
          onChange={(event) => {
            setNombre(event.target.value);
          }}
          className="form-control" value ={nombre}placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Edad: </span>
          <input type="number" value={edad}
          onChange={(event) => {
            setEdad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">País: </span>
          <input type="text" value={pais}
           onChange={(event) => {
            setPais(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un país" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Cargo: </span>
          <input type="text" value={cargo}
           onChange={(event) => {
            setCargo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Antigüedad: </span>
          <input type="number" value={anios}
           onChange={(event) => {
            setAnios(event.target.value);
          }}
          className="form-control" placeholder="Ingrese la antigüedad de la empresa" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        
        
      
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2'onClick={update}>Actualizar</button>
            <button className='btn btn-info m-2'onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success m-2'onClick={add}>Registrar</button>
          }
          
        
        <div className='lista'>
        <button className='btn btn-success m-2'onClick={getEmpleados}>Listar</button>
        </div>
        </div>
      </div>
      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Antigüedad</th>
      <th scope="col">Acciones</th>
      
    </tr>
  </thead>
  <tbody>

  {
          empleadosList.map((val,key)=>{
            return  <tr key={val.id}>
            <th >{val.id}</th>
            <td>{val.nombre}</td>
            <td>{val.edad}</td>
            <td>{val.pais}</td>
            <td>{val.cargo}</td>
            <td>{val.anios}</td>  
            
            <td>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" 
              
              onClick={() => {
                editarEmpleado(val);
              }}
              className="btn btn-info">Editar</button>
              <button type="button" onClick = {() => {
                deleteEmpleado(val);
              }}className="btn btn-danger">Eliminar</button>
              
            </div>
            </td>

          </tr>

          })
        }
    
    
  </tbody>
    </table>
    </div>
  );
}

export default App;
