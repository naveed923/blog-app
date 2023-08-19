import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'

import { collection, getDocs, where } from 'firebase/firestore';
import { fireStoreReference } from '../Auth/FirebaseConfig'

function FilterUserBlog({data}) {
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
                    <p style={{ textAlign: 'justify' }}>{data.description}</p>
                    <Link className='text-decoration-none'>see all from this user</Link>

                </div>
            </div>
        </div>

    )
}

export default FilterUserBlog
