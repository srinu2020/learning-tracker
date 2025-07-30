import React,{useState,useContext} from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Goals = () => {
const [form,setForm]=useState({name:'',email:'',password:''})
const {login}=useAuth()
const navigate=useNavigate()

const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})

}

const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        const response=await axios.post('http://localhost:8080/api/auth/register', form)
        login(response.data)
        navigate('/groups')
    } catch (err) {
        alert(err.response?.data?.message||'Registeration error')
    }
}
  return (
    <div className="p-4 max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Register</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border" />
      <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
      <button className="w-full bg-blue-600 text-white py-2">Register</button>
    </form>
  </div>
  )
}

export default Goals