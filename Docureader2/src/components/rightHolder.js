import React, {useState} from 'react';
import {FiPlusCircle} from 'react-icons/fi';
import Axios from 'axios';

function FileUploader(props){

    const uploadHandler = (event) => {
      const file = event.target.files[0]
      file.isUploading = true;
      console.log(file)

      const formData = new FormData()
      formData.append(
        file.name,
        file,
        file.name
      )
      formData.append('username', sessionStorage.getItem('username'))
      formData.append('id', sessionStorage.getItem('id'))  

      Axios.post('http://127.0.0.1:8000/uploadDocument/', formData)
      .then((res) => {
        file.isUploading = false;
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
      })
    }

    return (
      <div id='fileInputCard'>
        <div id='fileInputDiv'>
          <input 
            id = 'fileInput'
            type='file'
            onChange={uploadHandler}
          />
          <button id='fileInputButton'>
            <i id='fileInputIconHolder'>
              <FiPlusCircle id='fileInputButtonIcon' size='2em'/>
            </i>
          </button>
        </div>
        <p id='fileInputBigText'>Supported Files:</p>
        <p id='fileInputSmallText'>PDF</p>
      </div>
    )
  }
  
  function RightHolder(props){
    return (
      <div id='rightHolder'>
        <FileUploader uploadFiles={props.uploadFiles}/>
      </div>
    )
  }

  export default RightHolder;