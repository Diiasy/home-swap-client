import React from "react";
import DatePicker from "react-datepicker";
import subDays from "date-fns/subDays";
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import axios from 'axios';
import qs from 'qs';
import "react-datepicker/dist/react-datepicker.css";

 
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Available extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.addAvailability = this.addAvailability.bind(this);
    }

    state = {
        startDate: new Date(),
        endDate: new Date(),
        selecting: false
    }
    
    handleChange(e) {
        if(!this.state.selecting){
            this.setState({
                startDate: e, 
                selecting: true
            })
        } else {
            this.setState({
                endDate: e,
                selecting: false
            })
        }
    }


    addAvailability(e) {
        e.preventDefault();
        let allDates = Object.values(eachDayOfInterval({ start: new Date(this.state.startDate), end: new Date(this.state.endDate) }))
        
        axios({
            url: `${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}/availabilty`,
            data: qs.stringify(allDates),
            withCredentials: true,
            method: "POST"
        })
        .then(response=> {
            this.props.profileUpdate(response.data);
            this.props.history.push(`/user/profile/${response.data._id}`);
        })
        .catch(error => {
            this.setState({error});
        })

    }
 
    render() {
        return (
            <div>
                <DatePicker
                    inline
                    onChange={this.handleChange}
                    minDate={subDays(new Date(), 1)}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                <button onClick={this.addAvailability} type="submit">Submit</button>


            </div>

        );
    }
    }

export default Available;