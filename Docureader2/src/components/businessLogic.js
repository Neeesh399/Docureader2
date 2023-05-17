import React from 'react';
//import {FiPlusCircle} from 'react-icons/fi';

import FolderHolder from './folderObject';
import RightHolder from './rightHolder';

class BusinessLogic extends React.Component{
  constructor(props){
    super(props)

    let allFolders = JSON.stringify([{name:"Starting Folder", documents:["Test Doc"]}])

    this.addFolder = this.addFolder.bind(this)
    this.changeFolderName = this.changeFolderName.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
    this.deleteFolder = this.deleteFolder.bind(this)
    this.changeDocumentName = this.changeDocumentName.bind(this)
    this.moveDocument = this.moveDocument.bind(this)
    this.deleteDocument = this.deleteDocument.bind(this)
    this.state = {
      folders: allFolders,
      files: []
    }
  }

  addFolder(){
    let allFolders = JSON.parse(this.state.folders);
    if (allFolders.length < 10){
      let newFolder = {name:"New Folder", documents:[]}
      allFolders.push(newFolder)
    } 
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  deleteFolder(index){
    let allFolders = JSON.parse(this.state.folders);
    if (allFolders.length > 1){
      allFolders.splice(index, 1);
    }
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  changeFolderName(index, newName){
    let allFolders = JSON.parse(this.state.folders);
    allFolders[index]['name'] = newName;
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  uploadFiles(file){
    let newFiles = this.state.files;
    newFiles.push(file)
    this.setState({
      folders: this.state.folders,
      files: newFiles
    })
  }

  changeDocumentName(folderIndex, documentIndex, newName){
    let allFolders = JSON.parse(this.state.folders);
    allFolders[folderIndex]["documents"][documentIndex] = newName
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  moveDocument(oldFolderIndex, oldDocumentIndex, newFolderIndex){
    let allFolders = JSON.parse(this.state.folders);
    let document = allFolders[oldFolderIndex]["documents"][oldDocumentIndex]
    allFolders[oldFolderIndex]["documents"].splice(oldDocumentIndex, 1)
    allFolders[newFolderIndex]['documents'].push(document)
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  deleteDocument(oldFolderIndex, oldDocumentIndex){
    let allFolders = JSON.parse(this.state.folders);
    allFolders[oldFolderIndex]["documents"].splice(oldDocumentIndex, 1)
    this.setState({
      folders: JSON.stringify(allFolders),
      files: this.state.files
    })
  }

  render (){
    return(
      <div id='businessLogic'>
        <FolderHolder folders={this.state.folders} addFolder={this.addFolder} changeFolderName={this.changeFolderName} deleteFolder={this.deleteFolder} changeDocumentName={this.changeDocumentName} moveDocument={this.moveDocument} deleteDocument={this.deleteDocument}/>
        <RightHolder uploadFiles={this.uploadFiles}/>
      </div>
    )
  }
}

export default BusinessLogic;