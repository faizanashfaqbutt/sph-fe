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
import { Link, useHistory } from 'react-router-dom';

export default function ProfileEdit() {
    const { user } = JSON.parse(localStorage.getItem('user')) || null
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
        defaultValues: {
            name: user.name,
            email: user.email,
        }
    });
    const onSubmit = handleSubmit(async data => {
        console.log(data)
        axios.patch(`http://localhost:3000/v1/users/${user.id}`, data)
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'Successfull ', detail: 'Information Updated' });
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Failed ', detail: err.response.data.message });
            })
    });


    return (
        <div className='mt-8'>

                <Toast ref={toast} />
                <div className="col-12 p-7 bg-bluegray-50 border-round ">
                    <div className="card">
                        <h5>Update Profile</h5>
                        <form onSubmit={onSubmit}>
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="name">Name</label>
                                    <InputText id="name" type="text" {...register("name")} />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="email">Email</label>
                                    <InputText id="email" type="text" {...register("email")} />
                                </div>

                                {/* <div className="field col-12 md:col-6">
                                    <label htmlFor="password">Password</label>
                                    <InputText id="password" type="password" {...register("password")} />
                                </div> */}

                                
                                <Button type="submit" label="Update" />
                            </div>
                        </form>
                    </div>
                </div>

        </div>
    )
}
