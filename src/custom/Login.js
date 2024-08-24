import React, { useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function SearchForm() {
    const toast = useRef()
    const history = useHistory()
    const validation = Yup.object().shape({})


    const {
        handleSubmit,
        control,
        watch,
        register,
        setValue,
        getValues,
        values,
        formState,
        reset,
    } = useForm({
        resolver: yupResolver(validation),
        shouldUnregister: false,
    });
    const onSubmit = handleSubmit(async data => {
        console.log(data)
        axios.post('http://localhost:3000/v1/auth/login', data)
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                toast.current.show({ severity: 'success', summary: 'Successfull ', detail: 'Logged In ' });
                setTimeout(() => {
                    // console.log('reloading')
                    history.push('/')
                    window.location.reload()
                }, 1000);
                // reset()
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Failed ', detail: 'Incorrect Credentials' });

            })
    });


    return (
        <div className='mt-8'>

        <h1 className='text-center'>Smart Hunting - Login </h1>
        <div className='max-w-max m-auto mt-8 '>
            <Toast ref={toast} />
            <div className="col-12 p-7 bg-bluegray-50 border-round ">
                <div className="card">
                    <h5>Credentials</h5>
                    <form onSubmit={onSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" type="text" {...register("email")} />
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="password">Password</label>
                                <InputText id="password" type="password" {...register("password")} />
                            </div>
                            <Button type="submit" label="Login" />
                        </div>
                    </form>
                </div>
                <p>
                Do not have an account? 
                <Link to="/register" className="layout-topbar-logo">
                     <span>  Click to Register!  </span>
                </Link>
                </p>

            </div>
        </div>

        </div>
    )
}
