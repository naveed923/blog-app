import React, { useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import { database } from '../Auth/FirebaseConfig'
import { signOut } from 'firebase/auth'

function UpdateProfile() {
     const navigateTo=useNavigate();
    const logout=async()=>{
        await signOut(database).then(e=>{
            navigateTo('/Login')
        })
    }
  return (
    <div>
      <Row className='bg-primary p-2'>
                <Col md={{ offset: 1 }} className='d-flex justify-content-between'>
                    <span className='text-white'>Personal Blogging App</span>
                    <Link className='text-white text-decoration-none text-right' onClick={logout}>Logout</Link>

                </Col>
            </Row>
            <Row className='bg-success p-3'>
                <Col md={{ offset: 1 }} className=''>
                    <h1>Profile</h1>
                </Col>
            </Row>
            <br /> <br /> <br /> 
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="card custom-profile-card">
                    <div className="card-body">
                        <form action="">
                            <div className="form-group">
                            <img src={require('./../image/download.jpg')} height={300} width={300} alt="" style={{ borderRadius: "20%" }} />
                            <h2>Khubaib Irfan</h2>
                            <h2>Password</h2>
                                <input type="text" className="form-control form-control-lg custom-input" name='oldpassword' placeholder='Old Password' />
                                {/* {errors.email && touched.email ? (<span style={{ color: 'red' }}>{errors.email}</span>) : null} */}
                                <input type="text" className="form-control form-control-lg custom-input" name='newpassword' placeholder='New Password'/>
                                {/* {errors.password && touched.password ? (<span style={{ color: 'red' }}>{errors.password}</span>) : null} */}
                                <input type="text" className="form-control form-control-lg custom-input" name='conpassword' placeholder='Repeat Password' />
                                {/* {errors.password && touched.password ? (<span style={{ color: 'red' }}>{errors.password}</span>) : null} */}

                            </div>
                            <div>

                                <button type="submit" className="btn btn-primary">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default UpdateProfile
