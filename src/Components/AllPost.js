import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import  { useEffect } from 'react'


import { fireStoreReference } from '../../src/Auth/FirebaseConfig'
import { CollectionReference, addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'
import AllPostData from './AllPostData'

function AllPost() {
    const [value, setValue] = useState([]);
    const collectionValue = collection(fireStoreReference, "Blog");
    useEffect(() => {
        const getData = async () => {
            const dbValue = await getDocs(collectionValue);
            setValue(dbValue.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        getData();
    })
  return (
    <>
         <Row className='bg-secondary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <Link className='text-white text-decoration-none text-right'>Login</Link>

                </Col>
            </Row>
            <Row className='bg-danger p-3'>
                <Col md={{  }} className=''>
                    <h1>Good Morning Readers!</h1>
                </Col>
            </Row>  
            <Row className='p-3'>
                <Col md={{ offset: 0 }} className='mt-3'>
                    <h1>All Blogs!</h1>
                </Col>
            </Row>  
            {value!=null?value.map(item=><AllPostData data={item}/>):null}
    </>
  )
}

export default AllPost
