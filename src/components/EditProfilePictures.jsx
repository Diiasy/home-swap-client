import React, { Component } from 'react';
import service from "../utils/service";
import uid from 'uid';

class EditProfilePictures extends Component {
    constructor(props) {
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }
    
    state = {
        pictures: []
    }

    handleFileUpload(e) {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append("pictures", e.target.files[0]);
        service.handleUpload(uploadData)
            .then(response => {
                console.log('response is: ', response);
                this.setState({ pictures: response.pictures });
                this.props.addPicture(response.pictures.pop());
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
                        <div>
                            <img key={picture._id} src={picture.path} alt={picture.name} className="col-8 m-2"/>
                            <button type="submit" onClick = {() => this.props.deletePictures(picture._id)}>Delete Picture</button>
                        </div>
                    )
                }
                <input onChange={(e) => this.handleFileUpload(e)} key={uid()} type='file' name='pictures' className="form-control-file" />  
          
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}

export default EditProfilePictures;