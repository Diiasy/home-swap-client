import React, { Component } from 'react';
import service from "../utils/service";
import uid from 'uid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class EditProfilePictures extends Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }
    
    state = {
        pictures: []
    }

    handleFileUpload(e) {
        const uploadData = new FormData();
        uploadData.append("pictures", e.target.files[0]);
        service.handleUpload(uploadData)
            .then(response => {
                this.setState({ pictures: response });
                this.props.addPicture(response.pop());
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }

    render() {
        let pictures = this.props.user.pictures;
        return (
            <div className="row">
                {
                    pictures && pictures.map(picture => 
                        <div key={picture._id} className="col-md-12 col-lg-6 d-flex justify-content-center">
                            <img src={picture.path} alt={picture.name} className="col-10 m-1"/>
                            <div className="col-2">
                                <button type="submit" className="p-2 " onClick = {() => this.props.deletePictures(picture._id)}><FontAwesomeIcon icon={faTrash}/></button>
                            </div>
                        </div>
                    )
                }
                <input onChange={(e) => this.handleFileUpload(e)} key={uid()} type='file' name='pictures' className="form-control-file" />  
                {this.state.error && <p className="error-message">{this.state.error}</p>}
            </div>
        )
    }
}

export default EditProfilePictures;