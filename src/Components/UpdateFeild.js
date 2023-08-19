import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import { fireStoreReference } from '../../src/Auth/FirebaseConfig'
import { CollectionReference, addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'


  function  UpdateFeild({data}) {
    const [item, setItem] = useState({ title: '', description: '' });
   const navigatoTo=useNavigate();
    const getUserPost=async()=>{
    const docRef = doc(fireStoreReference, "Blog", data);
    const docSnapshot =await getDoc(docRef);
    
    if (docSnapshot.exists()) {
        
        const value = docSnapshot.data();
        setItem(value);
        
        // console.log(item);
      } else {
        
        console.log("Document not found.");
      }

    }
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setItem(previousData=>{
            return {
                ...previousData,
                [name]:value,
            }
        })
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        const docRef = doc(fireStoreReference, 'Blog', data);
    
        try {
          await updateDoc(docRef, {
            title: item.title,
            description: item.description,
          });
          console.log('Document updated successfully.');
          navigatoTo('/Dashboard')
        } catch (error) {
          console.error('Error updating document:', error);
        }
      };
    useEffect(()=>{
        getUserPost()
    },[data])
   
 return (
   <>
    <Row className='bg-primary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <span className=' text-right'>
                        <span className='text-white mx-4'>Khubaib</span>
                        <Link className='text-white text-decoration-none'>Logout</Link>

                    </span>

                </Col>
            </Row>
            <Row className='bg-success p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>Update Post</h1>
                </Col>
            </Row>

            <div className="container h-100 d-flex justify-content-center align-items-center my-4">
                <div className="card custom-dashboard-card">
                    <div className="card-body">
                        <form action="" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg custom-input" name='title' value={item.title} onChange={handleChange} placeholder='Placeholder'  />
                                {/* {errors.title && touched.title ? (<span style={{ color: 'red' }}>{errors.title}</span>) : null} */}
                                <input type="text" className="form-control form-control-lg custom-dashboard-input" name='description' value={item.description} onChange={handleChange} placeholder='What is in your mind'  />
                                {/* {errors.description && touched.description ? (<span style={{ color: 'red' }}>{errors.description}</span>) : null} */}

                            </div>
                            <div>

                                <button type="submit" className="btn btn-primary">Update blog</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
   </>
  )
}

export default UpdateFeild
