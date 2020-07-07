import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import Default from '../layouts/Default';
import {Route} from "react-router-dom";
import MemberCard from '../components/MemberCard';
import '../layouts/map.css';
import MapCard from '../components/MapCard.jsx';

mapboxgl.accessToken = `${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`;

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.setNewUser = this.setNewUser.bind(this);

        this.state = {

            users: [],
            user: null
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
        const fixHistory = this.props.history;
        const fixThis =this;
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/list`,
            method: "GET",
            withCredentials: true
        })
        .then(response => {
            response.data.forEach((user)=> {
                var el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage= 'url(/marker.png)';
                el.style.backgroundSize = "contain";
                el.style.width = 40 + 'px';
                el.style.height = 58 + 'px';
                el.style.top = -29 + "px";
                el.addEventListener('click', function() {
                    fixThis.setState({user})
                    fixHistory.push(`/map/member/${user._id}`)
                });
        
                new mapboxgl.Marker(el)
                .setLngLat(user.geometry.coordinates)
                .addTo(map); 
            })
            this.setState({users: response.data});
        })
    }

    setNewUser(response){
        let user = response;
        this.setState({user})
    }

    render() {
        return (
            <Default>
                <div className="mapContainer container-fluid">
                    <MapCard {...this.props} ref={this.mapRef} />

                    <Route exact path="/map/member/:userId" render={(props)=> <MemberCard user={this.state.user}/>} /> 
                </div>
            </Default>
        )
    }
}