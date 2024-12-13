import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SingleEyeglassee from '../SingleEyeglasses/SingleEyeglasses.jsx';
import { APIRequests } from "../../APIRequests.js";
import './Eyeglasses.css'

function Eyeglasses() {
  const [selectedValue, setSelectedValue] = useState('everyOne');
  const [displayEyeglasses, setDisplayEyglasses] = useState([]);
  const [loadMore, setLoadMore] = useState(true)
  const [eyeglassesPage, setEyeglassesPage] = useState({ men: 1, women: 1, sun: 1, sport: 1 });
  const [changeTypeGlasses, setChangeTypeGlasses] = useState("change");
  const APIRequest = new APIRequests()
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.split('/')[1] == 'eyeglasses') {
      setChangeTypeGlasses("change")
      setLoadMore(true)
    }
  }, [location])

  useEffect(() => {
    const kindOfGlasses = location.pathname.split('/')[2];
    const fetchData = async () => {
      if (loadMore && location.search == "") {
        try{
          const response = await APIRequest.getRequest(
            `/eyeglasses/kind/${kindOfGlasses}/?_page=${eyeglassesPage[kindOfGlasses]==1?
              eyeglassesPage[kindOfGlasses]:
              eyeglassesPage[kindOfGlasses]-1
            }`);
          const json = await response.json();
            if (changeTypeGlasses == "notChange") {
              setDisplayEyglasses([...displayEyeglasses, ...json]);
            } else {
              setDisplayEyglasses([...json]);
            }
          setChangeTypeGlasses("notChange");
          setEyeglassesPage(prevState => {
            const updatedState = { ...prevState };
            Object.keys(updatedState).forEach(key => {
              updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
            });
            return updatedState;
          });
          setLoadMore(false);
        }
        catch(error){
          alert(error)
        }
      }
    };
    fetchData();
  }, [changeTypeGlasses, loadMore]);

  const handleSortByChange = async (event) => {
    const kindOfGlasses = location.pathname.split('/')[2];
    let value = event.target.value;
    setSelectedValue(value);
    if (value == 'everyOne') {
      setChangeTypeGlasses("notChange")
      navigate(`/eyeglasses/${kindOfGlasses}`)
      try{
        const response = await APIRequest.getRequest(
          `/eyeglasses/kind/${kindOfGlasses}/?_page=${eyeglassesPage[kindOfGlasses]}`);
        const json = await response.json();
        setDisplayEyglasses([...displayEyeglasses, ...json]);
        setEyeglassesPage(prevState => {
          const updatedState = { ...prevState };
          Object.keys(updatedState).forEach(key => {
            updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
          });
          return updatedState;
        });
        setLoadMore(false);
      }
      catch(error){
        alert(error)
      }
    }
    else {
      navigate(`/eyeglasses/${kindOfGlasses}?sortBy=${value}`)
      try{
        const response = await APIRequest.getRequest(
          `/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses] - 2}&sort=${value}`);
        const json = await response.json();
        setLoadMore(false);
        setDisplayEyglasses(json)
        setEyeglassesPage(prevState => {
        const updatedState = { ...prevState };
        Object.keys(updatedState).forEach(key => {
          updatedState[key] = key === kindOfGlasses ? prevState[key] - 1 : 1;
        });
          return updatedState;
        });
      }
      catch(error){
        alert(error)
      }
    }
  }

  const cheackLocation = async () => {
    const kindOfGlasses = location.pathname.split('/')[2];
    if(location.search != ""){
      try{
        const response = await APIRequest.getRequest(
          `/eyeglasses/kind/${kindOfGlasses}?_page=${eyeglassesPage[kindOfGlasses]}&sort=price`);
        const json = await response.json();
        setLoadMore(false);
        setDisplayEyglasses([...json])
        setEyeglassesPage(prevState => {
          const updatedState = { ...prevState };
          Object.keys(updatedState).forEach(key => {
            updatedState[key] = key === kindOfGlasses ? prevState[key] + 1 : 1;
          });
            return updatedState;
          });
      }
      catch(error){
        alert(error)
      }
    }
  };

  return (<>
  <div>
    <select id="sortBy" value={selectedValue} onChange={handleSortByChange}>
      <option value="everyOne">הכל</option>
      <option value="price" >מחיר</option>
    </select>
    </div>
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} title=
          {eyeglasses.title} imgDisplay={eyeglasses.imgDisplay} imgCamara={eyeglasses.imgCamara} />
      </div>)
      }
      <button onClick={() => { setLoadMore(true); 
        setChangeTypeGlasses("notChange")
        cheackLocation();
      }}>תראו לי עוד</button>
    </div>
  </>)
}
export default Eyeglasses;
