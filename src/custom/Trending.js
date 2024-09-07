import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Autocomplete from "react-google-autocomplete";



export default function SearchForm() {
    const toast = useRef()

    const validation = Yup.object().shape({})
    const [isTrending, setIsTrending] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

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
    console.log(values)
    const onSubmit = handleSubmit(async data => {
        console.log(data)
        setIsLoading(true)
        setIsTrending(null)
        axios.post('http://localhost:3000/v1/trending/find', { link: data.link })
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'Successfull ', detail: 'Results are fetched' });
                // reset()
                setIsTrending(res.data.isTrending)
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Failed ', detail: 'Something went wrong' });

            }).finally(() => setIsLoading(false))   
    });


    return (
        <div>
            <Toast ref={toast} />

            <div className="col-12">
                <div className="card">
                    <h5>Find Trending</h5>
                    <form onSubmit={onSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-12">
                                <label htmlFor="link">link</label>
                                <InputText tooltipOptions={{ position: "bottom" }} tooltip="Link of amazon product" id="keywords" type="text" {...register("link")} />
                            </div>

                            <Button type="submit" label="Search" disabled={isLoading} />
                        </div>
                    </form>
                    {
                        isTrending !== null && <h6>Trending: {isTrending ? 'Yes' : 'No'}</h6>
                    }
                </div>
            </div>
        </div>
    )
}
