import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import '../SpecificInfo/SpecificInfo.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Invitation from '../Invitation/Invitation.jsx';
import SingleEyeglasses from "../SingleEyeglasses/SingleEyeglasses.jsx";
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import Alert from '@mui/material/Alert';

function SpecificInfo() {
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState([])
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        console.log("specific", eyeglasses)
        fetch(`https://localhost:8082/eyeglasses/${eyeglasses.model}`, {
            method: 'GET',

        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    console.log("😂", json.data[0][0])

                    setMoreImages([...moreImages, ...json.data[1]])

                    setCurrentEyeglasses(glassesData => ({
                        ...glassesData,
                        ...json.data[0][0]
                    }));


                }
            })
    }, [])

    return (<>
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

                <div id="datas">
                    <p>סה"כ</p>
                    <p id="totalPrice">{eyeglasses.price}₪</p>
                    <Invitation />
                 
                </div>
            </div>

            <img id="imgBig" src={eyeglasses.photo} />
            
        </div>
        <div id="moreGlasses">

            <div className="title">
                {moreImages.length > 1 ? <p> משקפיים נוספות ממותג זה...</p> : <></>}
            </div>
            <div id="moreGlasses">
                {moreImages.map((img, index) =>
                    (img.model != eyeglasses.model) ? <SingleEyeglasses key={index} id="singleEyeglasses" model={img.model} price={img.price} photo={img.photo} title={img.title} />
                        : console.log(img.model, "pp", eyeglasses.model)
                    
                )
                }
            </div>
        </div>
    </>)
    
}
export default SpecificInfo;