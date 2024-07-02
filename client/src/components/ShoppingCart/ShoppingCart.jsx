import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css';  // Import custom CSS for additional styling
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("ShoppingCart")) || [];
    setProducts(storedProducts);
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
          <img className="product-image" src={product.imgDisplay} alt={`Image of ${product.imgDisplay}`} />
          <div className="product-detail">
            <div className="product-name">{product.company}</div>
            <div className="product-description">{product.title}</div>
            {/* <div className="product-description">{product.amount > 1 ? product.amount / 2 + 0.5 : product.amount}</div> */}
            <div className="product-price">{formatCurrency(product.price)}</div>
            <div className="product-rating">
              <Rating value={product.rating} readOnly stars={5} cancel={false} />
            </div>
            <div className="product-tags">
              <Tag value={product.model} severity={getSeverity(product.inventoryStatus)} />
            </div>
          </div>
          <Button onClick={() => removeFromCart(product.model)}>
            <DeleteOutlineOutlinedIcon />
          </Button>

        </div>
      </div>
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productModel) => {
    let removedOne = false;
    const updatedProducts = products.filter((product) => {
      if (!removedOne && product.model === productModel) {
        removedOne = true;
        return false; // Skip this item
      }
      return true; // Keep other items
    });
    setProducts(updatedProducts);
    localStorage.setItem("ShoppingCart", JSON.stringify(updatedProducts));
    navigate('./')
  };

  return (<>
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <DataView value={products} itemTemplate={itemTemplate} layout="list" />
    </div>
    <button onClick={() => { navigate('/paymentForm') }}>לתשלום</button>
  </>
  );
}