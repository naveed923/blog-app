import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fireStoreReference } from '../../src/Auth/FirebaseConfig'
import { CollectionReference, addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'

function Post({data}) {
    const handleDelete=async()=>{
        const deleteValue=doc(fireStoreReference,"Blog",data.id)
        await deleteDoc(deleteValue);
    }
  return (
    <div className="container h-100 d-flex justify-content-center align-items-center my-4">
    <div className="card custom-post">
        <div className="card-body">
            <div className='d-flex mb-3'>

                <img src={require('./../image/download.jpg')} height={77} width={77} alt="" style={{ borderRadius: "20%" }} />

                <div className='mx-3'>
                    <h2>{data.title}</h2>
                    <h5>BILL GATES : march 21-2023</h5>
                </div>
            </div>
            <p style={{textAlign:'justify'}}>{data.description}</p>
            <Link className='text-decoration-none' onClick={handleDelete}>Delete</Link>
            <Link className='text-decoration-none mx-3' to={`/UpdatePost/${data.id}`}>Edit</Link>
        </div>
    </div>
</div>


  )
}

export default Post
