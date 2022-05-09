import React, {useState, useEffect} from 'react'
import './MainArea.css'
import {useSelector, useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'

function MainArea() {

    const [inpInfo, setInpInfo] = useState({
        title: '',
        subtitle: '',
        body: ''
    })

    const [inpModify, setInpModify] = useState({
        title: '',
        subtitle: '',
        body: ''
    })

    const selected = useSelector(state => state.selectedReducer.selectedNote)

    useEffect(() => {
        setInpModify({
            title: selected.title,
            subtitle: selected.subtitle,
            body: selected.body
        })
    }, [selected])

    const dispatch = useDispatch()

    const [validation, setValidation] = useState(true)

    const updateInput   = (e) => {
        const actualInp = e.target.getAttribute('id')

        if(selected.toggle){
            const newObjState = {...inpModify, [actualInp]: e.target.value}
            setInpModify(newObjState)
        }else if(selected.toggle === false){
            const newObjState = {...inpInfo, [actualInp]: e.target.value}
            setInpInfo(newObjState)
    }}

    const handleForm = (e) => {
        e.preventDefault()

        if(selected.toggle){
            if(selected.title.length < 1){
                setValidation(false)
                return;
            }
            setValidation(true)

            dispatch({
                type: 'UPDATENOTE',
                payload: inpModify
            })
            dispatch({
                type: 'RESETNOTE'
            })
            setInpModify({
                title: '',
                subtitle: '',
                body: ''
            })
        }   else if(selected.toggle === false){
        if(inpInfo.title.lenght < 1 ){
            setValidation(false);
            return;
        }
        setValidation(true);

        dispatch({
            type: 'ADDNOTE',
            payload: {...inpInfo, 
            id: uuidv4()} 
        })
        setInpInfo({
            title: '',
            subtitle: '',
            body: ''
        })
    }

    }


  return (
    <div className="container-content">
        <h2>Votre plume</h2>
        <form onSubmit={handleForm}>
            <label htmlFor="title">Le titre</label>
            <input 
            value={inpModify.toggle ? inpModify.title : inpInfo.title}
            onChange={updateInput}
            type="text" 
            id="title" />

            {!validation && <span className="info-validation">Veuillez entrer un titre</span>}

            <label htmlFor="subtitle">Sous-titre</label>
            <input 
            value={inpModify.toggle ? inpModify.subtitle : inpInfo.subtitle}
            onChange={updateInput}
            type="text" 
            id="subtitle" />

            {/* {!validation && <span className="info-validation">Veuillez entrer un sous-titre</span>} */}


            <label htmlFor="body">Votre texte</label>
            <textarea
            value={inpModify.toggle ? inpModify.body : inpInfo.body}
            onChange={updateInput} 
            type="text" 
            id="body" 
            placeholder='Votre texte...'></textarea>

            <button>Enregistrer</button>
        </form>
    </div>
  )
}

export default MainArea