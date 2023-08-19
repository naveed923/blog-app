import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { fireStoreReference } from '../../src/Auth/FirebaseConfig'
import { CollectionReference, addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'


function AllPostData({data}) {
  
  return (
    <div className="container-fluid h-100 d-flex  align-items-center my-4">
    <div className="card custom-post">
        <div className="card-body">
            <div className='d-flex mb-3'>

                <img src={require('./../image/download.jpg')} height={80} width={80} alt="" style={{ borderRadius: "20%" }} />

                <div className='mx-3'>
                    <h2>{data.title}</h2>
                    <h5>Inzamam Malik - Auguest 555050</h5>
                </div>
            </div>
            <p style={{textAlign:'justify'}}>{data.description}</p>
            <Link className='text-decoration-none' to={`/UserBlog/${data.id}`}>see all from this user</Link>
            
        </div>
    </div>
</div>
  )
}

export default AllPostData
