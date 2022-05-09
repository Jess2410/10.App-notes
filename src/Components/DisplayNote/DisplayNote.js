import React from 'react'
import './DisplayNote.css'
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'

function DisplayNote() {

    const {id} = useParams()

    const {notes} = useSelector(state => state.notesReducer)

    const indexArticle = notes.findIndex(item => item.title === id)

  return (
    <div className="display-text-zone">
        <h2 className="title-display">
            Votre note : {notes[indexArticle] ? `${notes[indexArticle].title}` : ""}
        </h2>
        <span className="subtitle-display">
        {notes[indexArticle] ? `${notes[indexArticle].subtitle}` : ""}
        </span>   
        <p className="txt-display">
         {notes[indexArticle] ? `${notes[indexArticle].body}` : ""}
        </p> 
    </div>
  )
}

export default DisplayNote