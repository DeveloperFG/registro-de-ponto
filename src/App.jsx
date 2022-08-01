import React,{ useState, useEffect } from 'react'
import './Styles/index.css'

 import Card from './components/Card'

function App() {

 const [nome, setNome] = useState('');
 const [user, setUser] = useState({name:'', avatar:''});
 const[funcionarios, setFuncionarios] = useState([])  


 function handleAddFuncionario(){
    const newFuncinario = {
      name: nome,
      time: new Date().toLocaleTimeString("pr-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

     
    };
    setFuncionarios(prevState => [...prevState, newFuncinario]);
    setNome('')
 }

 useEffect(()=>{
  fetch('https://api.github.com/users/DeveloperFG')
  .then((response)=> response.json())
  .then(data =>{
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })      
  })
    
 }, [])


  return (
    <div className="container">
      <header>
       <h1>Registro de ponto</h1>
       <div>
        <strong><small>{user.name} </small>  </strong>
        <img src={user.avatar}  alt='Foto perfil'/>
      </div>
      </header>

      
    
      <input type='text' 
      value={nome}
      placeholder='digite seu nome...'
      onChange={(e) => setNome(e.target.value)}   
      />
      <button onClick={handleAddFuncionario}>Registrar</button>

     { 
     funcionarios.map((funcionario, index) => (
      <Card 
      key={index}
      name={funcionario.name}
      time={funcionario.time} />
     ))
        
     }
      
    </div>
  )
}

export default App
