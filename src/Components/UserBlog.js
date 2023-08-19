import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import FilterUserBlog from './FilterUserBlog'
import { collection, getDocs } from 'firebase/firestore';
import { fireStoreReference } from '../Auth/FirebaseConfig';
function UserBlog() {
         const query=useParams();
         const {id}=query;
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
            <Row className='bg-primary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <Link className='text-white text-decoration-none text-right'>Login</Link>

                </Col>
            </Row>
            <Row className='bg-success p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>&lt;Back to all Blogs</h1>
                </Col>
            </Row>
            <br /> <br />
            <Row className='p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>All from Elon Musk  </h1>
                </Col>
            </Row>  
            {value!=null?value .filter(item => item.id === id).map(item=><FilterUserBlog data={item}/>):null}          
    </>
  )
}

export default UserBlog
