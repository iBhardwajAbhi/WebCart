import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ManageCategories = () => {
  
  const [categories, setCategories] = useState()
  const [name, setName] = useState()
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [catId, setCatId] = useState()

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')))
   setToken(JSON.parse(localStorage.getItem('token')))
    getCategory()
  }, [])
  const getCategory = async ()=>{
    const res = await axios.get('/api/category/get', )
    setCategories(res.data)
  }
  const deleteHandler = async (categoryId)=>{
      const res = await axios.delete('/api/category/delete', {headers:{'authorization': token}, data:{id:user._id, categoryId}} )
      console.log(res)
      getCategory()
  }
const addHandler = async()=>{
    const res = await axios.post('/api/category/create', {id:user._id, name}, {headers:{'authorization': token}})
    getCategory()
    setName('');
    console.log(res)
  }
  return (
    <div>
    <div>ManageCategories</div>
    {
        categories && categories.map((item)=>{
          return (<>
          <div>{item.name}</div>
          <button onClick={()=>{deleteHandler(item._id)}}>delete</button></>)
        })
    }
    <div>Add new Category</div>
    <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <button onClick={addHandler}>Add Category</button>
    </div>
  )
}

export default ManageCategories