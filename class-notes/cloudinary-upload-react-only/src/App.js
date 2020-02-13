import React from 'react';
import Dropzone from 'react-dropzone'
import axios from 'axios'
import './App.css';

const CLOUDINARY_CLOUD_NAME = 'ironjake';
// NOTE need to set this inside your cloudinary console!!!!! click link below
// https://cloudinary.com/console/settings/upload#upload_presets
// NEXT TO "Upload Presets" click "Enable unsigned uploading"
// copy/paste the randomly generated name below, you can also edit the upload preset name (and give it a folder to save to)
const UPLOAD_PRESET = 'kjdhfg';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const DEFAULT_STATE = {
  file: "",
  name: "",
  cloudinary_url: "",
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  invalidFile(rejected) {
    console.log("file(s) you tried to upload had an ERROR: ", rejected)
  }

  validFileDropped(accepted) {
    // console.log(accepted);
    if (accepted.length === 1) {
      const file = accepted[0];
      this.setState({file});
    } else if (accepted.length > 1) {
      window.confirm('Try Again! ...Only one image');
    }
  }

  handleChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit = e => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("public_id", this.state.name);

      axios.post(CLOUDINARY_URL, formData)
      .then(response => {
        const data = response.data;
        this.setState({...DEFAULT_STATE, cloudinary_url: data.secure_url});
        console.log(data);
      })
      .catch(err => console.error("ERROR: ", err));
  }

  displayDropZoneText = ({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
    const defaultTxt = "Click/Drag to upload pic";
    const dropZoneTxt = !this.state.file ? defaultTxt : `${this.state.file.name}`;
    return dropZoneTxt;
  }

  render() {
    const uploadForm = (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Name</label>
          <input
              type="text"
              name="name"
              value={ this.state.name }
              onChange={ e => this.handleChange(e)}
          />
          <Dropzone
            accept="image/*"
            multiple={false}
            onDropAccepted={(accepted) => { this.validFileDropped(accepted) }}
            onDropRejected={(rej) => { this.invalidFile(rej) }}
          >
            {this.displayDropZoneText}
          </Dropzone>
          <button type="submit">Upload to cloudinary</button>
        </form>
      </div>
    );

    const uploadedImage = <img width="500" height="500" src={this.state.cloudinary_url} alt=""/>;

    return (
      <div className="App">
        {uploadForm}
        {this.state.cloudinary_url && uploadedImage}
      </div>
    );
  }

}

export default App;
