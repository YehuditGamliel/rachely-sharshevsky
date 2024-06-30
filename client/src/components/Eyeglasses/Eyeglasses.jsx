import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Eyeglasses.css'
import SingleEyeglassee from '../SingleEyeglasses/SingleEyeglasses.jsx';
import { APIRequests } from "../../APIRequests.js";

function Eyeglasses() {
  const [selectedValue, setSelectedValue] = useState('everyOne');
  const [displayEyeglasses, setDisplayEyglasses] = useState([]);
  const [loadMore, setLoadMore] = useState(true)
  const [eyeglassesPage, setEyeglassesPage] = useState(1);
  const APIRequest = new APIRequests()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (loadMore == true) {
        const response = await APIRequest.getRequest(`/eyeglasses?_page=${eyeglassesPage}`)
        const json = await response.json();
        if (response.status != 200) {
          alert(json.error)
        }
        else {
          setDisplayEyglasses([...displayEyeglasses, ...json.data])
        }
      }
      setLoadMore(false)
      setEyeglassesPage(eyeglassesPage + 1)
    }
    fetchData();
  }, [loadMore])

  const handleSortByChange = async (event) => {
    let value = event.target.value;
    setSelectedValue(event.target.value);
    if (event.target.value == 'everyOne') {
      navigate(`/eyeglasses`)
      const response = await APIRequest.getRequest(`/eyeglasses?_page=${1}`)
      const json = await response.json();
      if (json.status != 200) {
        alert(json.error)
      }
      else {
        setDisplayEyglasses([...json.data])
        setEyeglassesPage(eyeglassesPage + 1)
      }
      
    }
    else {
      navigate(`/eyeglasses?sortBy=${value}`)
      const response = await APIRequest.getRequest(`/eyeglasses?_page=${eyeglassesPage}&sort=${value}`)
      const json = await response.json();
      if (json.status != 200) {
        alert(json.error)
      }
      else {
        setDisplayEyglasses(json.data)
      }
    }
  }

  return (<>

    <select id="sortBy" value={selectedValue} onChange={handleSortByChange}>
      <option value="everyOne">evert one</option>
      <option value="price" >price</option>
    </select>
    {console.log("displayEyeglasses", displayEyeglasses)}
    <div id='container'>
      {displayEyeglasses.map((eyeglasses, index) => <div key={index} class="glasses">
        <SingleEyeglassee model={eyeglasses.model} price={eyeglasses.price} title=
          {eyeglasses.title} imgDisplay={eyeglasses.imgDisplay} imgCamara={eyeglasses.imgCamara} />
      </div>)
      }
      <button onClick={() => { setLoadMore(true) }}>load more</button>
    </div>
  </>)
}
export default Eyeglasses;
