import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {  useAuth } from '../context/AuthContext'
const Groups = () => {
    const{user}=useAuth()
    const[groupName,setGroupName]=useState('')
    const[groups,setGroups]=useState([])
    const fetchGroups=async()=>{
        try {
            const res=await axios.get('http://localhost:8080/api/groups/view',
               { headers:{
                Authorization:`Bearer ${user.token}`

                }}
            )
            console.log(res);
            
            console.log(res.data);
            
            setGroups(res.data)
            
        } catch (err) {
            console.error(err);
            alert('Failed to fetch groups')
            
            
        }
    }

    const joinGroup=async(e)=>{
        e.preventDefault()
        if(!groupName) return
        try {
            await axios.post('http://localhost:8080/api/groups/join',{groupName},{
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            })

            setGroupName('')
            fetchGroups()
        } catch (error) {
            console.error(err)
            alert('Failed to join group')
            
        }

    }
    useEffect(() => {
      fetchGroups()
    }, [])
    
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Learning Groups</h2>

      <form onSubmit={joinGroup} className="flex gap-2 mb-4">
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="flex-1 p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Join</button>
      </form>

      <ul className="space-y-2">
        {groups.map((group) => (
          <li key={group._id} className="p-2 border rounded bg-gray-100">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Groups