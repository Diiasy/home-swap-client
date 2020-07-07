import React from "react";
import DatePicker from "react-datepicker";
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import axios from 'axios';
import qs from 'qs';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../layouts/Calendar.css';

 
class Available extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.addAvailability = this.addAvailability.bind(this);
    }

    state = {
        availability: null,
        startDate: new Date(),
        endDate: null,
        selecting: false
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile/${this.props.match.params.id}`, {withCredentials: true})
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
    
    handleChange(e) {
        if(!this.state.selecting){
            this.setState({
                startDate: e, 
                selecting: true
            });
        } else {
            if(e < this.state.startDate){
                this.setState({
                    startDate: e, 
                    selecting: true
                });
            } else {
                this.setState({
                    endDate: e,
                    selecting: false
                });
            }
        }
    }

    addAvailability(e) {
        e.preventDefault();
        let allDateTimes = [];
        if (this.state.endDate === null){
            allDateTimes.push( new Date(this.state.startDate ));
        } else {
            let dateRange = Object.values(eachDayOfInterval({ start: new Date(this.state.startDate), end: new Date(this.state.endDate) }));
            dateRange.forEach(date => allDateTimes.push(date))
        }
        let allDates = allDateTimes.map((dateTime)=> {
            let dt = new Date(dateTime);
            return Date.UTC(dt.getFullYear(),dt.getMonth(),dt.getDate());
        });
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
        });
    }
 
    render() {
        return (
            <div>
                <DatePicker
                    inline
                    excludeDates={this.state.availability}
                    onChange={this.handleChange}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                <div className="col d-flex justify-content-center">
                    <button onClick={this.addAvailability} type="submit">Submit</button>

                </div>
            </div>
        );
    }
}

export default Available;