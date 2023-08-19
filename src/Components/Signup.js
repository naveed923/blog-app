import React, { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import { useFormik } from 'formik'
import { Schema } from '../Schema'
import { database, fireStoreReference } from '../Auth/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'

const initialValue = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: ''
}

function Signup() {
    const navigateTo = useNavigate();

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValue,
        validationSchema: Schema,
        onSubmit: (value, type) => {

            createUserWithEmailAndPassword(database, value.email, value.password).then(async(data) => {
                
                // const user = data.user;
                // await user.updateProfile({
                //     displayName: value.firstname+value.lastname,
                // });

                // Save user data to Firestore
                //const db = getFirestore();
                const collectionValue = collection(fireStoreReference, "User");
                // const userRef = doc(fireStoreReference, 'users', user.uid);

                // const userData = {
                //     email: value.email,
                //     displayName:value.firstname+value.lastname ,
                // };

                // await setDoc(userRef, userData);
                const currentDate = serverTimestamp();
            
                await addDoc(collectionValue, { name: value.firstname+value.lastname, email:value.email, timestamp: currentDate }).then(data => {
                    //alert("Successfully Add");
                    navigateTo('/Login');
                }).catch(err => {
                    alert(err.Code);
                })

                //navigateTo()
                // alert('user created');
                type.resetForm();
            }).catch(err => {
                alert(err.Code);
            })

        }

    })
    return (
        <>
            <Row className='bg-primary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <Link className='text-white text-decoration-none text-right' to='/Login'>Login</Link>

                </Col>
            </Row>
            <Row className='bg-success p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>Signup</h1>
                </Col>
            </Row>
            <br /> <br /> <br /> <br /> <br />
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="card custom-card">
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg custom-input" name='firstname' value={values.firstname} placeholder='First Name' onChange={handleChange} onBlur={handleBlur} />

                                {errors.firstname && touched.firstname ? (<span style={{ color: 'red' }}>{errors.firstname}</span>) : null}
                                <input type="text" className="form-control form-control-lg custom-input" name='lastname' value={values.lastname} placeholder='Last Name' onChange={handleChange} onBlur={handleBlur} />
                                {errors.lastname && touched.lastname ? (<span style={{ color: 'red' }}>{errors.lastname}</span>) : null}
                                <input type="text" className="form-control form-control-lg custom-input" name='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? (<span style={{ color: 'red' }}>{errors.email}</span>) : null}
                                <input type="password" className="form-control form-control-lg custom-input" name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                {errors.password && touched.password ? (<span style={{ color: 'red' }}>{errors.password}</span>) : null}
                                <input type="password" className="form-control form-control-lg custom-input" name='confirmpassword' placeholder='Repeat Password' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} />
                                {errors.confirmpassword && touched.confirmpassword ? (<span style={{ color: 'red' }}>{errors.confirmpassword}</span>) : null}
                            </div>
                            <div class="text-center">

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>






        </>
    )
}

export default Signup
