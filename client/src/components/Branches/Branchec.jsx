import React, { useState, useEffect } from 'react';

import GoogleMaps from '../GoogleMap/GoogleMap.jsx'
function Branches() {
    const [cities, setCities] = useState([]);
    const [branches, setBranches] = useState([])
    const [search, setSearch] = useState('city')
    const [branch, setBranch] = useState({})
    
    useEffect(() => {
        fetch(`http://localhost:8082/branch`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then((json) => {
            ''
            if (json.status != 200) {
              alert(json.error)
            }
            else {
              setCities([...json.data])
              setSearch('city')
            }
          })
      },[])
      const lookForCity = (event) => {
        fetch(`http://localhost:8082/branch/${event.target.value}`, {
          method: 'GET',
    
        })
          .then(response => response.json())
          .then((json) => {
            if (json.status != 200) {
              alert(json.error)
            }
            else {
              setBranches([...json.data])
              // console.log("branch", branches)
              setSearch('branch')
            }
          })
      };
    
      const showDetails = (event) => {
        const singleBranch = branches.find(t => `${t.street}${t.number}` === event.target.value);
        setBranch(singleBranch);
        setSearch('map')
      }
    
    
        return (
          <>

{search === 'map' ?
      (<>
      {/* {console.log(branches[0].lat ,branches[0].lng)} */}
        <GoogleMaps lat={branches[0].lat} lng={branches[0].lng} street={branches[0].street} number={branches[0].number}
          phone={branches[0].phone} hours={branches[0].hours} days={branches[0].days} />
      </>
      ) : null}
    {
      (search == 'city') ? <select className="branches-chooseCity" onChange={lookForCity}>
        <option selected>בחירת עיר</option>
        {cities.map((city) => {
          return <option>{city.city}</option>;
        })}
      </select> : <select className="branches-chooseCity" onChange={showDetails}>
        <option selected>בחירת סניף</option>
        </select> }

          </>
        );
     

}
export default Branches;