import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const hosturl = "http://192.168.0.174:5000";

  const notesInt = [];
  const [notes, setNotes] = useState(notesInt);

  const getNotes = async () => {
    const response = await fetch(`${hosturl}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('auth-token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Adding New notes
  const addNote = async (title, description, tag) => {
    if (description.length < 5) {
      alert("Description must be atleast 5 characters.");
    } else if (title.length < 3) {
      alert("Title must be atleast 3 characters.");
    } else {
      const response = await fetch(`${hosturl}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('auth-token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);
    }
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${hosturl}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('auth-token'),
      },
    });
    console.log(response.json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${hosturl}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("edited " + json);
  };

  const fetchUser = async () => {
      const response = await fetch(
        `http://192.168.0.174:5000/api/auth/getuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const json = await response.json();
      localStorage.setItem("username", json.name);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, fetchUser }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
