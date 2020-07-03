import React from 'react';
let mapStyles = {
    width: "50%",
    height: "100vh"
  }

class MapCard extends React.Component {

    render(){
        return (   
            <div style={mapStyles} ref={this.props.innerRef} className="map"></div>
        )
    }

}

export default React.forwardRef((props,ref)=> <MapCard innerRef={ref} {...props} />);