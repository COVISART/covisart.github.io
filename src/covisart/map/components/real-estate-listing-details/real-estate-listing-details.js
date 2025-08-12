import React from "react"
import { Button } from "antd" ;
import "./real-estate-listing-details.css"
import { getFormattedCurrency } from "../../libs/format-currency"
import { FloorplanIcon } from "../../icons/floor-plan-icon"
import { BathroomIcon } from "../../icons/bathroom-icon"
import { BedroomIcon } from "../../icons/bedroom-icon"

export const RealEstateListingDetails = ({ details }) => {
  const {
    property_address,
    property_price,
    listing_title,
    property_bedrooms,
    property_bathrooms,
    property_square_feet,
    listing_description
  } = details
 console.log(details)
  return (
    <div className="details-container">
      <div className="listing-content">
        <h2>{listing_title}</h2>
        <p>{property_address}</p>
        <div className="details">
          {
            /**
             * 
             * <div className="detail_item">
            <FloorplanIcon /> {property_square_feet.replace("sq ft", "ft²")}
          </div>
          <div className="detail_item">
            <BathroomIcon /> {property_bathrooms}
          </div>
          <div className="detail_item">
            <BedroomIcon /> {property_bedrooms}
          </div>
             */
          }
        </div>

        <p className="description">{listing_description}</p>

        <p className="price">
          {
            //getFormattedCurrency(property_price)
            <Button 
              color="default" 
              variant="outlined"
              onClick={() => 
              window.open('https://maps.app.goo.gl/8Aydi7REeo8Jax6L9', '_blank', 'noopener,noreferrer')}>
                Get Direction
            </Button>
          }
          </p>
      </div>
    </div>
  )
}
