import React from 'react'
import Post from './Post'
import UpdateFeild from './UpdateFeild'
import { useParams } from 'react-router-dom'

function UpdatePost() {
    const query=useParams();
    const {id}=query;
    console.log(id);
  return (
    <div>
      <UpdateFeild data={id}/>
    </div>
  )
}

export default UpdatePost
