import React, {useContext, useState} from "react";
import CreateNote from "./CreateNote";
import "./Home.css";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const Home = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({title: "", description:"", tag:"default"})
  // Function for Create note button
  function togglehide() {
    const container = document.querySelector(".hideIN");
    const addnotebtn = document.querySelector(".addnotebtn");
    container.classList.remove("display-hidden");
    addnotebtn.classList.add("display-hidden");
  }

  const handleChange=(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  // Function for submit button
  const submit=(e)=> { 
    addNote(note.title, note.description, note.tag);
    setNote({title: '', description:'', tag: 'default'})
    const addnotebtn = document.querySelector(".addnotebtn");
    const container = document.querySelector(".hideIN");
    container.classList.add("display-hidden");
    addnotebtn.classList.remove("display-hidden");
  }

  return (
    <>
      <CreateNote submit={submit} togglehide={togglehide} note={note} change={handleChange} />
      <Notes />
    </>
  );
};

export default Home;
