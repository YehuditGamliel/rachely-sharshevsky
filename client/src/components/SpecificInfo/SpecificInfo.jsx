import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import '../SpecificInfo/SpecificInfo.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import  Invitation  from '../Invitation/Invitation.jsx';

function SpecificInfo() {
    const { state } = useLocation();
    const { photo, model, title, price } = state;
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState('')
    const [numOfProduct,setNumOfProduct]=useState(1)
    const [toalPrice, setToalPrice] = useState(price)
   
   
  

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        fetch(`http://localhost:8082/eyeglasses/${model}`, {
            method: 'GET',

        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    // console.log("!!!!!!!!!!!!!!!!"+json.dat)
                    setDisplaypecificInfo(json.data[0][0])
                    setMoreImages(json.data[1])

                }
            })
    }, [])


    const addProduct = () => {
       
        if (numOfProduct+1 <= displaySpecificInfo.stock) {
        setNumOfProduct(numOfProduct+1);
        setToalPrice(toalPrice+price);
       
          
        }
    };
    const removeProduct = () => {
       
        if (numOfProduct-1 != 0) {
            setNumOfProduct(numOfProduct-1);
            setToalPrice(toalPrice-price);
        }
       
    };

    return (<>
        {console.log(displaySpecificInfo)}
        <div id="card">
            <div id="container">
                <div id="title">
                    <p>{title} <></>
                        {displaySpecificInfo.company}</p>
                </div>
                <p>{price}$ </p>
                <p> דגם:{model}</p>
                <p>צבע עיקרי:{displaySpecificInfo.color}</p>
                <p> רחוב עדשה:{displaySpecificInfo.lensWidth}</p>
                <p>רוחב גשר:{displaySpecificInfo.BridgeWidth}</p>
                <p>חומר מסגרת:{displaySpecificInfo.material}</p>

                <div id="bottom">
                    <p>סה"כ</p>
                    <p id="totalPrice">{toalPrice}$</p>
                    
                    <Invitation/>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group"
                    > 
                        <Button onClick={removeProduct}>-</Button>
                        <input type="number"  step="1" 
                        value={numOfProduct}/>
                        <Button onClick={addProduct}>+</Button>
                    </ButtonGroup>


                </div>
            </div>
            {console.log(moreImages)}

            <img id="img" src={photo} />
           
        </div>
        {/* <div id="moreGlasses">
            {moreImages.map((img, index) =>
                <img id="img" src={img.photo} />
            )
            }

        </div>  */}
       

    </>)
}
export default SpecificInfo;