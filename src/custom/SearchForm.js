import React, { useEffect, useRef } from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import Autocomplete from "react-google-autocomplete";

        

export default function SearchForm() {
    const toast = useRef()

    const CONDITIONS = [
        { name: 'Good', code: 'used_good' },
        { name: 'New', code: 'new' },
        { name: 'Like New', code: 'used_like_new' },
        { name: 'Salvage', code: 'salvage' },
        { name: 'Fair', code: 'used_fair' }
    ];
    const PLATFORMS = [
        { name: 'Facebook', code: 'Facebook' },
        { name: 'Crage List', code: 'Crage List' },
    ]
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
    console.log(values)
    const onSubmit = handleSubmit(async data => {
        console.log(data)
        axios.post('http://localhost:3000/v1/scrap', {
            platform: data.platform,
            interests: [{
                keywords: data.keywords,
                city: data.city,
                state: data.state,
                radius: data.radius,
                platform: data.platform,
                min_price: data.minPrice,
                max_price: data.maxPrice,
                condition: data.condition,

            }]
        })
            .then((res) => {
                toast.current.show({ severity: 'success', summary: 'Successfull ', detail: 'Scraping has been started.' });
                // reset()
            })
            .catch((err) => {
                toast.current.show({ severity: 'error', summary: 'Failed ', detail: 'Something went wrong' });

            })
    });

    useEffect(() => {
        // console.log(values,getValues('keywords'))
        console.log(CONDITIONS.filter((c) => c.code === getValues('condition')))
        console.log(CONDITIONS.filter((c) => c.code === getValues('condition'))[0])

        console.log(PLATFORMS.filter((c) => c.code === getValues('plaform')))
        console.log(PLATFORMS.filter((c) => c.code === getValues('plaform'))[0])
    }, [watch('keywords'), watch('condition'), watch('platform')]);

    return (
        <div>
            <Toast ref={toast} />

            <Autocomplete
                apiKey={'AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk'}
                onPlaceSelected={(place) => {
                    console.log(place);
                }}
            />
            <div className="col-12">
                <div className="card">
                    <h5>Search Product</h5>
                    <form onSubmit={onSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="keywords">keywords</label>
                            
                            <InputText tooltipOptions={{ position: "bottom" }} tooltip="Name of the product" id="keywords" type="text" {...register("keywords")} />
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="city">City</label>
                                <InputText tooltipOptions={{ position: "bottom" }} tooltip="Name of the City you want to search in" id="city" type="text" {...register("city")} />
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="state">State</label>
                                <InputText id="state" tooltipOptions={{ position: "bottom" }} tooltip="Name of the state you want search in" type="text" {...register("state")} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="radius">Radius</label>
                                <InputText id="radius" tooltipOptions={{ position: "bottom" }} tooltip="Area around you, you want to search in KM" type="text" {...register("radius")} />
                            </div>

                            <div className="field col-12 md:col-6">
                                <label htmlFor="condition">Condition</label>
                                <Dropdown id="condition" tooltipOptions={{ position: "bottom" }} tooltip="Condition of the product" value={CONDITIONS.filter((c) => c.code === getValues('condition'))[0]} onChange={(e) => setValue('condition', e.value.code)} options={CONDITIONS} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="platform">Platform</label>
                                <Dropdown id="platform" tooltipOptions={{ position: "bottom" }} tooltip="Platform for sraping" value={PLATFORMS.filter((c) => c.code === getValues('platform'))[0]} onChange={(e) => setValue('platform', e.value.code)} options={PLATFORMS} optionLabel="name" placeholder="Select One"></Dropdown>
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="minPrice">MinPrice</label>
                                <InputText id="MinPrice" tooltipOptions={{ position: "bottom" }} tooltip="Minimun price of the product"type="number" {...register("minPrice")} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="maxPrice">MaxPrice</label>
                                <InputText id="MaxPrice" tooltipOptions={{ position: "bottom" }} tooltip="Maximum price of the product" type="number" {...register("maxPrice")} />
                            </div>
                            <Button type="submit" label="Search" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
