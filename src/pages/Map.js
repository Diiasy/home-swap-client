import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './map.css';

// mapboxgl.accessToken = `${process.env.MAPBOX_ACCESS_TOKEN}`;
mapboxgl.accessToken = `pk.eyJ1IjoibmllbmtlMDkwNSIsImEiOiJja2MwYWludnAxaHM2MnRsZ3c4b3l0dHNqIn0.FIQX7sNolXaZEVPAUxOIrg`;


export default class Map extends Component {
    mapRef = React.createRef();
    constructor(props) {
        super(props);
            this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }
         
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,            
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
         
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
         
    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <div>
                <div className="sidebarStyle">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />          
            </div>
        )
    }
}

