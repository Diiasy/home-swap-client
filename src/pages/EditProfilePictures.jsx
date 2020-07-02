import React, { Component } from 'react';
import service from "../utils/service";
import uid from 'uid';
class EditProfilePictures extends Component {
    constructor() {
        super();
        this.addPicture = this.addPicture.bind(this);
    }
    
    state = {
        numOfPictures: 1,
        pictures: []
    }

    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();
        uploadData.append("pictures", e.target.files[0]);
        service.handleUpload(uploadData)
            .then(response => {
                console.log('response is: ', response);
                this.setState({ pictures: response.pictures });
            })
            .catch(err => {
                console.log("Error while uploading the file: ", err);
            });
    }

    addPicture(e) {
        e.preventDefault();
        this.setState({ numOfPictures: this.state.numOfPictures + 1 });
    }

    render() {
        return (
            <div className="edit-profile-picture">
   
                {[...Array(this.state.numOfPictures)].map(() => <input key={uid()}onChange={(e) => this.handleFileUpload(e)} type='file' name='pictures' />)}
                <button onClick={this.addPicture}>Add a picture</button>    
          
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        )
    }
}

export default EditProfilePictures;