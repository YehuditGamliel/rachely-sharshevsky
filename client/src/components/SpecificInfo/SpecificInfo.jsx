import React from "react";
import { useState, useEffect, useContext } from "react";
import { EyeglassesContext } from "../../EyeglassesProvider.jsx";
import Invitation from '../Invitation/Invitation.jsx';
import SingleEyeglasses from "../SingleEyeglasses/SingleEyeglasses.jsx";
import '../SpecificInfo/SpecificInfo.css'



function SpecificInfo() {
    const { eyeglasses, setCurrentEyeglasses } = useContext(EyeglassesContext);
    const [displaySpecificInfo, setDisplaypecificInfo] = useState('');
    const [moreImages, setMoreImages] = useState([])
    useEffect(() => {
        // { alert(eyeglasses.model) }
        fetch(`http://localhost:8082/eyeglasses/${eyeglasses.model}`, {
            method: 'GET',

        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    console.log("json", json.data[0])
                    setMoreImages([...moreImages, ...json.data[0]])

                    setCurrentEyeglasses(glassesData => ({
                        ...glassesData,
                        ...json.data[0][0]
                    }));
                }
            })
    }, [])

    return (<>
        {console.log("@@", eyeglasses, displaySpecificInfo)}
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
           {console.log("!!!!!!!!!!!1",eyeglasses.imgDisplay)}
            <img id="imgBig" src={eyeglasses.imgDisplay} alt="Eyeglasses"/>

        </div>
        <div id="moreGlasses">
            {console.log("##########", moreImages)}
            <div className="title">
                {moreImages.length > 1 ?
                    <div>
                        <p> משקפיים נוספות ממותג זה...</p>
                        <div id="moreGlasses">
                            {moreImages.map((img, index) =>
                                (img.model != eyeglasses.model) ? <SingleEyeglasses key={index} id="singleEyeglasses" model={img.model} price={img.price} imgDisplay={img.imgDisplay} imgCamara={img.imgCamara} title={img.title} />
                                    : console.log(img.model, "pp", eyeglasses.model)
                            )
                            }</div>
                    </div>
                    : <></>}
            </div>

        </div>
    </>)

}
export default SpecificInfo;


//import { div } from "@tensorflow/tfjs";
//import { useAuth } from '../../hook/AuthProvider.jsx'
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';

// const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//         right: -3,
//         top: 13,
//         border: `2px solid ${theme.palette.background.paper}`,
//         padding: '0 4px',
//     },
// }));
