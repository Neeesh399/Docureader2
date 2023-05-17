import React, {useState} from 'react';
import {FiChevronDown, FiChevronUp, FiFolderPlus, FiTrash2, FiMessageCircle} from 'react-icons/fi';

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

function DocumentObject(props){
  const[, drag] = useDrag(() => ({
    type: "document",
    item: {
      name: props.name,
      type: "document",
      folderIndex: props.folderIndex,
      documentIndex: props.documentIndex
    }
  }))

  let name = props.name;
  return (
    <div ref={drag} className='documentDiv'>
      <input 
        className='documentName'
        type='text'
        value={name}
        onChange={(event) => {
          props.changeDocumentName(props.folderIndex, props.documentIndex, event.target.value)
        }}
      />
      <button className='chatButton'>
        <i>
          <FiMessageCircle className='chatButtonIcon' size='1.5em'/>
        </i>
      </button>
    </div>
  )
}

function FolderObject(props){
    const [isClosed, setClosed] = useState(true);

    const[, drag] = useDrag(() => ({
      type: "folder",
      item:{
        name: props.name,
        type: "folder",
        index: props.myIndex
      }
    }))

    const[, drop] = useDrop(() => ({
      accept: "document",
      drop: (item) => handleDrop(item),
    }))

    const handleDrop = (item) => {
      props.moveDocument(item['folderIndex'], item["documentIndex"], props.myIndex)
    }

    let name = props.name

    if (isClosed){
      return(
        <div className='folderDiv' ref={(el) => {drag(el); drop(el);}}>
          <input
            className='folderName'
            type='text'
            value={name}
            onChange={(event) => {
              props.changeFolderName(props.myIndex, event.target.value)
            }}
            onBlur={(event) => {
              if (props.name === ""){
                props.changeFolderName(props.myIndex, "New Folder")
              }
            }}
          />
          <button
            className='folderExpandButton'
            onClick={() => {
              setClosed(false)
              console.log('test')
            }}>
            <i>
              <FiChevronUp className='folderExpandButtonIcon' size='1.5em'/>
            </i>
          </button>
        </div>
      )
    }
    else{
      let allDocuments = props.allDocuments;
      return(
        <div className='folderDivExterior' ref={(el) => {drag(el); drop(el);}}>
          <div className='folderDiv'>
            <input
              className='folderName'
              type='text'
              value={name}
              onChange={(event) => {
                props.changeFolderName(props.myIndex, event.target.value)
              }}
              onBlur={(event) => {
                if (props.name === ""){
                  props.changeFolderName(props.myIndex, "New Folder")
                }
              }}
            />
            <button
              className='folderExpandButton'
              onClick={() => {
                setClosed(true)
                console.log('test2')
              }}>
              <i>
                <FiChevronDown className='folderExpandButtonIcon' size='1.5em'/>
              </i>
            </button>
          </div>
          {
            allDocuments.map((value, index) => {
              return <DocumentObject key={index} folderIndex={props.myIndex} documentIndex={index} name={value} changeDocumentName={props.changeDocumentName}/>
            })
          }
        </div>
      )
    }
  }
  
  function Trashcan(props){
    const [{isOver, canDrop}, drop] = useDrop(() => ({
      accept: ["folder", "document"],
      drop: (item) => handleDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
    }))
  
    /*
    if (isOver && canDrop){
      let trashcan = document.getElementById("trashBinIcon")
      trashcan.style.color="rgb(248, 121, 57)"
    }*/
  
    const handleDrop = (item) => {
      if (item["type"] === "folder"){
        props.deleteFolder(item["index"])
      }
      else{
        props.deleteDocument(item["folderIndex"], item["documentIndex"])
      }
    }
  
    return (
      <div id='trashBin' ref={drop}>
        <i id='trashBinIcon'>
          <FiTrash2 size='2em'/>
        </i>
      </div>
    )
  }
  
function FolderHolder(props){
    let allFolders = JSON.parse(props.folders)

    return (
        <div id='folderHolder'>
        { allFolders.map((value, index) => {
            return <FolderObject key={index} name={value['name']} myIndex={index} changeFolderName={props.changeFolderName} allDocuments={value['documents']} changeDocumentName={props.changeDocumentName} moveDocument={props.moveDocument}/>
        }) }
        <div id='footerInFolderHolder'> 
            <button id='folderAddButton' onClick={props.addFolder}>
            <i>
                <FiFolderPlus id='folderAddIcon' size='2em'/>
            </i>
            </button>
            <Trashcan deleteFolder={props.deleteFolder} deleteDocument={props.deleteDocument}/>
        </div>
        </div>
    )
}

export default FolderHolder;