import React from "react";
// import { AiFillPhone } from "react-icons/ai";
// import { FaCity, FaMapMarkerAlt, FaUser } from "react-icons/fa";


export default function SingleBranchDetailes({ city, street, number,phoneNumber, days,hours }) {
  return (
   
  <>
      <div className="branch">
        <div className="detailsbranch">
          <p className="detailes-icon">
            {/* <FaCity /> */}
          </p>

          {city} {street} {number}
        </div>
        <div className="detailsbranch">
          <p className="detailes-icon">
            {/* <FaMapMarkerAlt /> */}
            {phoneNumber}
          </p>
         
        </div>

        <div className="detailsbranch">
          <p className="detailes-icon">
            {/* <AiFillPhone /> */}
          </p>

          {days}
        </div>
        <div className="detailsbranch">
          <p className="detailes-icon">
            {/* <FaUser /> */}
          </p>
          {hours}
        </div>
      
      </div>
    </>
  );
}