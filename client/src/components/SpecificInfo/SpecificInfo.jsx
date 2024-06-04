import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import Button from '@mui/material/Button';
import '../SpecificInfo/SpecificInfo.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Invitation from '../Invitation/Invitation.jsx';
import SingleEyeglasses from "../SingleEyeglasses/SingleEyeglasses.jsx";
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import Alert from '@mui/material/Alert';

function SpecificInfo() {
    // const { state } = useLocation();
    // const { photo, model, title, price } = state; 
    const [alert,setAlert]=useState()
    const { eyeglasses,setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState([])
    const [numOfProduct, setNumOfProduct] = useState(1)
    //const [toalPrice, setToalPrice] = useState(eyeglasses.price)

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
         console.log("specific",eyeglasses)
        fetch(`http://localhost:8082/eyeglasses/${eyeglasses.model}`, {
            method: 'GET',

        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    console.log("😂",json.data[0][0])
                //   const t=json.data[0][0];
                //   setCurrentEyeglasses({...eyeglasses,t})
                    setMoreImages([...moreImages, ...json.data[1]])

                    setCurrentEyeglasses(eyeglasses => ({
                        ...eyeglasses,
                       color:json.data[0][0].color,
                       stock:json.data[0][0].stock,
                       BridgeWidth:json.data[0][0].BridgeWidth,
                       company:json.data[0][0].company,
                       description:json.data[0][0].description,
                       lensWidth:json.data[0][0].lensWidth,
                       material:json.data[0][0].material
                    
                    }));
                }
            })
    }, [])


    const addProduct = () => {

        if (numOfProduct + 1 <=eyeglasses.stock ) {
                 setAlert(<Alert severity="error">אין מספיק במלאי!.</Alert>)
        }
           else{
            setCurrentEyeglasses((previous) => ({...previous, price:(previous.price/numOfProduct)*(numOfProduct+1)}));
            setNumOfProduct(numOfProduct + 1);
           }
           
           

        
    };
    const removeProduct = () => {

        if (numOfProduct - 1 != 0) {

            setCurrentEyeglasses((previous) => ({...previous, price:(previous.price/numOfProduct)*(numOfProduct-1)}));
            setNumOfProduct(numOfProduct - 1);
            // setToalPrice(toalPrice - price);
        }

    };

    return (<>
    {alert}
        {console.log("pp",eyeglasses)}
        {/* { console.log("😊",eyeglasses.t.color */}

        

        <div id="card">
            <div id="container">
                <div id="title">
                    <p>{eyeglasses.title} <></>
                        {displaySpecificInfo.company}</p>
                </div>
                <p>{eyeglasses.price}₪</p>
                <p> דגם:{eyeglasses.model}</p>
                <p>צבע עיקרי:{eyeglasses.color}</p>
                <p> רחוב עדשה:{eyeglasses.lensWidth}</p>
                <p>רוחב גשר:{eyeglasses.BridgeWidth}</p>
                <p>חומר מסגרת:{eyeglasses.material}</p>

                <div id="bottom">
                    <p>סה"כ</p>
                    <p id="totalPrice">{eyeglasses.price}₪</p>
                    <Invitation   />
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled button group">  
                        <Button onClick={removeProduct}>-</Button>
                        <input type="number" step="1"
                            value={numOfProduct} />
                        <Button onClick={addProduct}>+</Button>
                    </ButtonGroup>
                </div>
            </div>
            {console.log(moreImages)}

            <img id="img" src={eyeglasses.photo} />

        </div>
        <div id="moreGlasses">
        {/* {moreImages.map(function(productSpec, i){
        return <span key={i}><b>Category Name:</b> {productSpec.price}</span>;
})} */}
<div>
     {moreImages.length>1?<p> משקפיים נוספות ממותג זה...</p>:<></>}
    </div>     
         <div  id="moreGlasses">
            {moreImages.map((img,index) =>
            (img.model!=eyeglasses.model) ?<SingleEyeglasses key={index} id="SingleEyeglasses" model={img.model}price={img.price} photo={img.photo} title={img.title} />
             :console.log(img.model,"pp",  eyeglasses.model)
            //    }
            )
            }
            </div>
        </div>
    </>)
}
export default SpecificInfo;