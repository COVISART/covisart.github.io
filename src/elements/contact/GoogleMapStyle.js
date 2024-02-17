import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { HomeOutlined } from '@ant-design/icons';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '10px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);
class GoogleMapStyle extends Component {
  static defaultProps = {
    center: {
      lat: 39.995639,
      lng: 32.752335
    },
    zoom: 15
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="google-map-style-1">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBPJffuk5iqp_6IjD42JZX1-NGBM3wPSbw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
          <AnyReactComponent
            lat={39.995639}
            lng={32.752335}
            text="COVISART - Research & Development Company.">
          </AnyReactComponent>
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapStyle;