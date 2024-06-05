import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
// import glasses1 from '../../../img/glasses1.jpg';
// import glasses2 from '../../../img/glasses2.jpg';
// import glasses3 from '../../../img/glasses3.jpg';
// import glasses4 from '../../../img/glasses4.png';
import './ShoppingCart.css';  // Import custom CSS for additional styling

// Map for images
// const imageMapping = {
//   glasses1,
//   glasses2,
//   glasses3,
//   glasses4,
// };

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("ShoppingCart")) || [];
    setProducts(storedProducts);
    console.log("😒",products)
  }, []);

  // Function to format price and rating
  const formatCurrency = (value) => {
    return value ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '';
  };

  // Function to get severity for the Tag component
  const getSeverity = (inventoryStatus) => {
    switch (inventoryStatus) {
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

  // Template for rendering each product
  const itemTemplate = (product) => {
    return (
      <div className="col-12" key={product.id}>
        <div className="product-item">
        <div className="product-name">{product.model}</div>
          <img className="product-image" src={product.photo} alt={`Image of ${product.name}`} />
          <div className="product-detail">
            <div className="product-name">{product.company}</div>
            <div className="product-description">{product.title}</div>
            <div className="product-price">{formatCurrency(product.price)}</div>
            <div className="product-rating">
              <Rating value={product.rating} readOnly stars={5} cancel={false} />
            </div>
            <div className="product-tags">
              <Tag value={product.model} severity={getSeverity(product.inventoryStatus)} />
            </div>
          </div>
          
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-icon-only"
            onClick={() => removeFromCart(product.id)}
          />
        </div>
      </div>
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("ShoppingCart", JSON.stringify(updatedProducts));
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <DataView value={products} itemTemplate={itemTemplate} layout="list" />
    </div>
  );
}