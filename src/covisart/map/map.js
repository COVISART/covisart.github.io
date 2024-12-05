import React, {useEffect, useState} from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import {CustomAdvancedMarker} from './components/custom-advanced-marker/custom-advanced-marker';
import {loadRealEstateListing} from './libs/load-real-estate-listing';
import "./advanced-maker.css"
const CompanyLocation = () => {
    return (
        <>
        <div className="advanced-marker-example" >
        <APIProvider apiKey={'AIzaSyBPJffuk5iqp_6IjD42JZX1-NGBM3wPSbw'} libraries={['marker']}>
            <Map
            mapId={'bf51a910020fa25a'}
            defaultZoom={13}
            defaultCenter={{lat: 39.995639,
              lng: 32.752335}}
            gestureHandling={'greedy'}
            disableDefaultUI>
            {/* advanced marker with html-content */}
            <CustomAdvancedMarker />
            </Map>
        </APIProvider>
        </div>
        
        </>
    )
}
export default CompanyLocation;