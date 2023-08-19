import React, { useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { PostSchema } from '../Schema'
import { CollectionReference, addDoc, collection, doc, getDocs, serverTimestamp } from 'firebase/firestore'
import { database, fireStoreReference } from '../../src/Auth/FirebaseConfig'
import Post from './Post'
import { signOut } from 'firebase/auth'
const initialValue = {

    title: '',
    description: ''

}
const collectionValue = collection(fireStoreReference, "Blog");
function Dashboard() {
    const [value, setValue] = useState([]);
    const navigateTo=useNavigate();
    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValue,
        validationSchema: PostSchema,
        onSubmit: async (value, type) => {
            console.log(value)

            const currentDate = serverTimestamp();
            

            await addDoc(collectionValue, { title: value.title, description: value.description, timestamp: currentDate }).then(data => {
                alert("Successfully Add");
            }).catch(err => {
                alert(err.Code);
            })


        }


    })

    useEffect(() => {
        const getData = async () => {
            const dbValue = await getDocs(collectionValue);
            setValue(dbValue.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        getData();
    })

    const logout=async()=>{
        await signOut(database).then(e=>{
            navigateTo('/Login')
        })
    }
    return (
        <>
            <Row className='bg-secondary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='aqua'>Personal Blogging App</span>
                    <span className=' text-right'>
                        <span className='text-white mx-4'>NAVEED </span>
                        <Link className='text-white text-decoration-none' onClick={logout}>Logout</Link>

                    </span>

                </Col>
            </Row>
            <Row className='bg-danger p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>Dashboard</h1>
                </Col>
            </Row>

            <div className="container h-100 d-flex justify-content-center align-items-center my-4">
                <div className="card custom-dashboard-card">
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg custom-input" name='title' placeholder='Placeholder' value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                {errors.title && touched.title ? (<span style={{ color: 'red' }}>{errors.title}</span>) : null}
                                <input type="text" className="form-control form-control-lg custom-dashboard-input" name='description' placeholder='What is in your mind' value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                {errors.description && touched.description ? (<span style={{ color: 'red' }}>{errors.description}</span>) : null}

                            </div>
                            <div>

                                <button type="submit" className="btn btn-primary">Publish blog</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Row className='p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>My Blogs</h1>
                </Col>
            </Row>
            {value!=null?value.map(item=><Post data={item}/>):null}
           {/* <Post data={value}/> */}
        </>
    )
}

export default Dashboard
