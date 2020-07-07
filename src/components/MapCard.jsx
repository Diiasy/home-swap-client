import React from 'react';
let mapStyles = {
    height: "100vh"
  };

class MapCard extends React.Component {

    render(){
        return (   
            <div style={mapStyles} ref={this.props.innerRef} className="map col-md-12 col-lg-6"></div>
        )
    }

}

export default React.forwardRef((props,ref)=> <MapCard innerRef={ref} {...props} />);