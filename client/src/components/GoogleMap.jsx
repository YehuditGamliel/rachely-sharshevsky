import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  right: "0%",
  left: "0%",
  bottom: "20%",
  top: "0%",
};

export class GoogleMap extends Component {
  _isMounted = false;

  state = {
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    validLocation: true
  };

  componentDidMount() {
    this._isMounted = true;

    const { lat, lng } = this.props;
    if (isNaN(lat) || isNaN(lng)) {
      this.setState({ validLocation: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onMarkerClick = (props, marker, e) => {
    if (this._isMounted && this.state.validLocation) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  };

  onClose = () => {
    if (this._isMounted && this.state.validLocation && this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    if (!this.state.validLocation) {
      return <div>Error: Invalid latitude or longitude value</div>;
    }

    return (
      <div className="showmap">
      {console.log("🙌",this.props)}
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 31.790174968679562, lng: 35.19898014288 }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={'optics'} 
            position={{  lat: 31.790174968679562, lng: 35.19898014288 }}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
              <p>{this.props.street} {this.props.number}</p>
              <p>{this.props.hours}</p>
              <p>{this.props.days}</p>
              <p>{this.props.phone}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }  
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAVs59O_1wPg60JevpZRTHu4BxbyGIWt8Q",
})(GoogleMap);