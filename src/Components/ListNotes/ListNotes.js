import React from 'react'
import "./ListNotes.css"
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function ListNotes() {

const {notes} = useSelector(state => state.notesReducer)

  return (
    <div className="container-content">
        <h2>Voici vos notes</h2>
        <ul className="notes-list-card">
          {notes.map((item)=>(
            <Link 
            to={{
              pathname: `/displayNote/${item.title}`
            }}
          >
            <li className="notes-list-card-item">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </li>
          </Link>
          ))}
        </ul>
    </div>
  )
}

export default ListNotes