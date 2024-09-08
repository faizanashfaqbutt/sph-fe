import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Image } from "primereact/image";
import { Button } from 'primereact/button';


export default function ScrapJobList() {
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
        axios.get(`http://localhost:3000/v1/scrap/jobs?limit=${pagination.limit}&page=${pagination.page}`)
            .then((res) => {
                console.log(res.data.results)
                setRows(res.data.results)
                setPagination((pg) => {
                    return { ...pg, total: res.data.totalResults }
                })
            }).catch((err) => { console.log(err) }).finally(() => setLoading(false))

    }, [pagination.page, pagination.limit])




    const statusTemplate = (rowData) => {
        if(rowData.status === 'completed'){
            return <span className="p-tag p-tag-success">Completed</span>
        }
        if(rowData.status === 'failed'){
            return <span className="p-tag p-tag-danger">Failed</span>

        }
        if(rowData.status === 'pending'){
            return <span className="p-tag p-tag-warning">Pending</span>

        }
    }
    return (
        <div>
            <div className="grid card">
                <h4>Scrap Job History</h4>
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

                        <Column field="searchedFor" header="Title"></Column>
                        <Column field="platform" header="Platform" ></Column>
                        <Column field="status" header="Status"  body={statusTemplate} ></Column>
                        {/* <Column field="isTrending" header="Trending" body={isTrendingTemplate} ></Column> */}
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
