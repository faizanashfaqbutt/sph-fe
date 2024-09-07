import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Image } from "primereact/image";
import { Button } from 'primereact/button';


export default function TrendSearchHistory() {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([])

    const [pagination, setPagination] = useState({
        first: 0,
        page: 0,
        limit: 10,
        total: 0
    })
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/v1/trending?limit=${pagination.limit}&page=${pagination.page}`)
            .then((res) => {
                console.log(res.data.results)
                setRows(res.data.results)
                setPagination((pg) => {
                    return { ...pg, total: res.data.totalResults }
                })
            }).catch((err) => { console.log(err) }).finally(() => setLoading(false))

    }, [pagination.page, pagination.limit])





    const imgTemplate = (rowData) => {
        console.log(rowData)
        return <div className="card">
            <div className="flex justify-content-center">
                <Image src={rowData?.imgSrc===''?'https://placehold.co/600x400?text=No+Image+Available':rowData?.imgsrc} alt="galleria" height={250} width={250} preview />
            </div>
        </div>
    }

    const linkTemplate = (rowData) => {
        return  <Button label="Open Link" className="p-button-outlined p-button-info mr-2 mb-2" onClick={()=>window.open(rowData.link,'_blank')}>
        </Button>
    }

    const isTrendingTemplate = (rowData) => {
        return rowData.isTrending ? <span className="p-tag p-tag-success">Trending</span> : <span className="p-tag p-tag-danger">Not Trending</span>
    }
    return (
        <div>
            <div className="grid card">
                <h4>Trend Search History</h4>
                <div className="col-12 lg:col-12 xl:col-12">

                    <DataTable
                        value={rows}
                        tableStyle={{ minWidth: '50rem' }}
                        lazy
                        first={pagination.first}
                        totalRecords={pagination.total}
                        paginator
                        rows={pagination.limit}
                        onPage={(event) => {
                            console.log(event)
                            setPagination((pg) => {
                                return { ...pg, page: event.page, first: event.first }
                            })
                        }}
                        dataKey="_id"
                        loading={loading}
                    >

                        <Column field="title" header="Title"></Column>
                        {/* <Column field="price" header="Price"></Column> */}
                        <Column field="link" header="Link" body={linkTemplate} ></Column>
                        <Column field="rating" header="Rating"  ></Column>
                        <Column field="bought" header="Bought In Previous Month"  ></Column>
                        <Column field="isTrending" header="Trending" body={isTrendingTemplate} ></Column>
                        <Column field="imgsrc" body={imgTemplate} header="Img"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
