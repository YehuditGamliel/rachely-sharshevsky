import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { useNavigate } from 'react-router-dom';
import './ListOfPurchase.css';  // Import custom CSS for additional styling
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



export default function ListOfPurchase() {
  const [purchases, setPurchases] = useState([]);
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      
        const response = await APIRequest.getRequest(`/purchase`)
        const json = await response.json();
        if (response.status != 200) {
          alert(json.error)
        }
        else {
          setPurchases([json.data])
        }
    }
    fetchData();
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
      <div className="col-12" key={product.price}>
        <div className="product-item">
          <img className="product-image" src={product.status} alt={`Image of ${product.imgDisplay}`} />
          <div className="product-detail">
            {/* <div className="product-name">{product.company}</div>
            <div className="product-description">{product.title}</div>
            <div className="product-description">{product.amount > 1 ? product.amount / 2 + 0.5 : product.amount}</div>
            <div className="product-price">{formatCurrency(product.price)}</div> */}
            <div className="product-rating">
              {/* <Rating value={product.rating} readOnly stars={5} cancel={false} /> */}
            </div>
            <div className="product-tags">
              {/* <Tag value={product.model} severity={getSeverity(product.inventoryStatus)} /> */}
            </div>
          </div>
          {/* <Button onClick={() => removeFromCart(product.model)}>
            <DeleteOutlineOutlinedIcon />
          </Button> */}

        </div>
      </div>
    );
  };

  // Function to remove a product from the cart
  const removeFromCart = (productModel) => {
    //אם בחר כמה מאותו משקפיים למחוק את הכל?
    const updatedProducts = purchases.filter((product) => product.model !== productModel);
    setPurchases(updatedProducts);
    localStorage.setItem("ShoppingCart", JSON.stringify(updatedProducts));
  };

  return (<>
    <div className="ListOfPurchase">
      <h2>Your Shopping Cart</h2>
    <DataView value={purchases} itemTemplate={itemTemplate} layout="list" />
    </div>
    
   
  </>
  );
}