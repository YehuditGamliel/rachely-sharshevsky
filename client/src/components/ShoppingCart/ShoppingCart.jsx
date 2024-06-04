// //import * as React from 'react';

// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
// import React, { useState,useEffect } from 'react';
// import PaymentForm from '../PaymentForm/PaymentForm';


// function ShoppingCart() {
    
//     const [arrGlasses,setArrGlassea] = useState([])

//     useEffect(() => {
//         setArrGlassea(JSON.parse(localStorage.getItem("ShoppingCart")))

//     }, [])

//     console.log("פפפ",arrGlasses[0])
//     return(
//         <>
//         <div>
//        {arrGlasses.map((glasses,index) =>
//         <div key={index}>
//             <p>{glasses.model}</p>
//         </div>
//        )}
//       {/* <PaymentForm/> */}
//       </div>
//         </>
//     )
// }
// export default ShoppingCart;

   

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
// import { ProductService } from './service/ProductService';

export default function ShoppingCart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(JSON.parse(localStorage.getItem("ShoppingCart")))

    }, [])
    // useEffect(() => {
    //     ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 5)));
    // }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const itemTemplate = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.img} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.model}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    return (
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} />
        </div>
    )
}
        