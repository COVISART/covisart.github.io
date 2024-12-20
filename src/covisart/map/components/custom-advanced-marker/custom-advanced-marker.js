import React, { useLayoutEffect, useState } from "react"
import { AdvancedMarker } from "@vis.gl/react-google-maps"
import classNames from 'classnames';
import './custom-advanced-marker.css'

import { RealEstateListingDetails } from "../real-estate-listing-details/real-estate-listing-details"
import { RealEstateGallery } from "../real-estate-gallery/real-estate-gallery"
import { RealEstateIcon } from "../../icons/real-estate-icon"
import {loadRealEstateListing} from '../../libs/load-real-estate-listing';

export const CustomAdvancedMarker = () => {
  const [realEstateListing, setRealEstateListing] = useState()
  useLayoutEffect(() => {
    loadRealEstateListing().then((result) => {
      setRealEstateListing(result);
    })
  },[])
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(true)
  const position = {
    lat: 39.995639,
    lng: 32.752335
  }
  //console.log(realEstateListing.details)
  const renderCustomPin = () => {
    return (
      <>
        <div className="custom-pin">
          <button className="close-button">
            <span className="material-symbols-outlined"> close </span>
          </button>

          <div className="image-container">
            <RealEstateGallery
              images={realEstateListing.images}
              isExtended={clicked}
            />
            {
              <span className="icon">
                <RealEstateIcon />
              </span>
            }
          </div>

          {
            <RealEstateListingDetails details={realEstateListing.details} />
          }
        </div>

        <div className="tip" />
      </>
    )
  }
  return (
    <>
      <AdvancedMarker
        position={position}
        title={"AdvancedMarker with custom html content."}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(true)}
        className={classNames("real-estate-marker", { clicked, hovered })}
        onClick={() => setClicked(!clicked)}>
        {realEstateListing && (renderCustomPin())}
      </AdvancedMarker>
    </>
  )
}
