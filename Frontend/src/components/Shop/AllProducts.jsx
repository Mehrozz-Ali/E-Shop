import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import Loader from '../Layout/Loader';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function AllProducts() {
    const { products, isLoading } = useSelector((state) => state.product);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        window.location.reload();
    }

    useEffect(() => {
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch, seller._id]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 0.7 },
        { field: "price", headerName: "Price", minWidth: 150, flex: 0.7 },
        { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.7 },
        { field: "sold", headerName: "Sold out", minWidth: 150, flex: 0.7 },
        {
            field: "Preview", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button><AiOutlineEye size={20} /></Button>
                        </Link>
                    </>
                )
            }
        },
        {
            field: "Delete", headerName: "", minWidth: 100, flex: 0.8, type: "number", sortable: false, renderCell: (params) => {
                const d = params.row.name;
                const product_name = d.replace(/\s+/g, "-");
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button onClick={() => handleDelete(params.id)}><AiOutlineDelete size={20} /></Button>
                        </Link>
                    </>
                )
            }
        },
    ]

    const row = [];
    products && products.forEach((item) => {
        row.push({
            id: item._id,
            name: item.name,
            price: "US$" + item.discountPrice,
            stock: item.stock,
            sold: 10,
        })
    })

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='w-full mx-8 pt-1 mt-1 bg-white'>
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                    </div>
                )
            }
        </>
    )
}

export default AllProducts