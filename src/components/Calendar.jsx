import React from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Available extends React.Component {
    state = {
        availability: null,
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.user._id}`)
        .then(response => {
            let allDates = response.data.availability;
            let availability = allDates.map((dateTime)=> {
                let dt = new Date(dateTime);
                return Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate());
            });
            this.setState({availability});
        })
        .catch (error => {
            this.setState({error});
        });
    }
 
    render() {
        return (
            <div>
                <DatePicker
                    inline
                    includeDates={this.state.availability}
                />
            </div>

        );
    }
}

export default Available;