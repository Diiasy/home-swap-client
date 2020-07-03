import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './map.css';
import axios from 'axios';
import Default from '../layouts/Default';

// mapboxgl.accessToken = `${process.env.MAPBOX_ACCESS_TOKEN}`;
mapboxgl.accessToken = `pk.eyJ1IjoibmllbmtlMDkwNSIsImEiOiJja2MwYWludnAxaHM2MnRsZ3c4b3l0dHNqIn0.FIQX7sNolXaZEVPAUxOIrg`;

export default class Map extends Component {
    constructor(props) {
        super(props);
            this.state = {
            // lng: -21,
            // lat: 64,
            // zoom: 2,
            users: []
        };
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        
        const map = new mapboxgl.Map({
            container: this.mapRef.current,            
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [5, 50], // starting position as [lng, lat]
            zoom: 4
        })

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        })
        // map.on('click', function(e){
        //     debugger
        // })

        // map.on('click', 'marker',function(e){
        //     debugger
        // })

        // map.on('click', 'circle',function(e){
        //     debugger
        // })

        // map.on('click', 'Popup',function(e){
        //     debugger
        // })
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/`,
            method: "GET",
            withCredentials: true
        })
        .then(response => {
            response.data.forEach((user)=> {
                var popup = new mapboxgl.Popup()
                    .setHTML(`<a href="/user/profile/${user._id}"><h3>${user.homeName}</h3></a><p>${user.homeDescription}</p>`);

                var marker = new mapboxgl.Marker()
                .setLngLat(user.geometry.coordinates)
                .setPopup(popup)
                .addTo(map);
            })
            this.setState({users: response.data});
            console.log(this.state.users);
        })
    }

    render() {
        // const { lng, lat, zoom } = this.state;
        return (
            <Default>
                <div>
                    {/* <div className="sidebarStyle">
                        <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div> */}
                    <div ref={this.mapRef} className='mapContainer' />
                </div>
            </Default>
        )
    }
}