import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import { useFormik } from 'formik'
import { LoginSchema, Schema } from '../Schema'
import {database, fireStoreReference} from '../../src/Auth/FirebaseConfig'
import {createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword} from 'firebase/auth' 
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'

const initialValue={
    
    email:'',
    password:''
    
}
function Login() {
    const navigateTo=useNavigate();
    const [login,setLogin]=useState(false);
    const [value, setValue] = useState([]);
    const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
        initialValues:initialValue,
        validationSchema:LoginSchema,
        onSubmit:(value,type)=>{
         console.log(value)
         signInWithEmailAndPassword(database,value.email,value.password).then(async(data)=>{
           
            navigateTo('/Dashboard')
           // setLogin(true);
            type.resetForm(); 
        //     const db = fireStoreReference;
        //     alert(value.email);
        // const collectionValue = collection(db, "User");
        // const q = query(collectionValue, where("email", "==", value.email));
        // const querySnapshot = await getDocs(q);
        // alert(querySnapshot);

        //     querySnapshot.forEach((doc) => {
        //         const user = doc.data();
        //         alert('User name:', user.name);
        //     });
        // }).catch(err=>{
        //     alert(err.Code)

        })
        }
    })
    return (

        <>
            <Row className='bg-primary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <Link className='text-white text-decoration-none text-right' onClick={()=>navigateTo('/Signup')}>signup</Link>

                </Col>
            </Row>
            <Row className='bg-success p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>Login</h1>
                </Col>
            </Row>
            <br /> <br /> <br /> <br /> <br />
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="card custom-login-card">
                    <div className="card-body">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg custom-input" name='email' placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? (<span style={{ color: 'red' }}>{errors.email}</span>) : null}
                                <input type="text" className="form-control form-control-lg custom-input" name='password' placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                {errors.password && touched.password ? (<span style={{ color: 'red' }}>{errors.password}</span>) : null}

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

export default Login
