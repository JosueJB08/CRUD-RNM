import './App.css';
import {useState} from "react"
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [anios,setAnios] = useState(0);
  const [editar,setEditar] = useState(false);
  const [id,setId] = useState(false);




  const [empleadosList, setEmpleados] = useState([]);



  const add = ()=> {
    Axios.post("http://localhost:3001/create", {
    nombre:nombre,
    edad:edad, 
    pais:pais,
    cargo:cargo,
    anios:anios
    }).then(()=>{
      getEmpleados();
      alert("Empleado registrado");
    });
  }

  const editarEmpleado = (val)=>{
      setEditar(true);
      setNombre(val.nombre);
      setEdad(val.edad);
      setPais(val.pais);
      setCargo(val.cargo);
      setAnios(val.anios);
      setId(val.id);

  }

  const getEmpleados = ()=> {
    Axios.get("http://localhost:3001/Empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }
  // getEmpleados();

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre</span>
            <input type="text"
              onChange={(event)=>{
                setNombre(event.target.value)
              }}
              className="form-control" value={nombre} placeholder="Ingresa su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad</span>
            <input type="number"
              onChange={(event)=>{
                setEdad(event.target.value)
              }}
              className="form-control" value={edad} placeholder="¿Cúal es su edad?" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País</span>
            <input type="text"
              onChange={(event)=>{
                setPais(event.target.value)
              }}
              className="form-control"value={pais} placeholder="¿De que país es?" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo</span>
            <input type="text"
              onChange={(event)=>{
                setCargo(event.target.value)
              }}
              className="form-control" value={cargo} placeholder="¿Cúal es su cargo en la empresa?" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años de experiencia</span>
            <input type="number"
              onChange={(event)=>{
                setAnios(event.target.value)
              }}
              className="form-control" value={anios} placeholder="¿Cuantos años de experiencia tiene?" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
        </div>
        <div className='card-footer text-muted'>
          <button className='btn btn-success' onClick={add}>Guardar</button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val,key) =>{
              return <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anios}</td>
                  <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" 
                      onClick={()=>{
                        editarEmpleado(val)
                      }} className="btn btn-info">Editar</button>
                      <button type="button" className="btn btn-danger">Eliminar</button>
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
