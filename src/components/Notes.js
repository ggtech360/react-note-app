import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import "./Notes.css";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, fetchUser } = context;
  const history = useNavigate();

  // State to store notes
  const [enote, changeEnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  },[]);

  // UseEffect to render notes
  useEffect(() => {
    if(localStorage.getItem('auth-token')){
      getNotes();
      fetchUser();
    }
    else{
      history('/login');
    }
    // eslint-disable-next-line
  });

  // UseRef for creating custom action on buttons
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref33 = useRef(null);

  // handleUpdate to get the clicked notes details
  const handleUpdate = (currentNote) => {
    ref.current.click();
    changeEnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // handleClick to perform an edit on note
  const handleClick = (e) => {
    editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
    ref2.current.click();
  };

  // handleMore to perform action on Read More button click
  const handleMore = (e) => {
    ref33.current.click();
    changeEnote({
      id: e.id,
      etitle: e.title,
      edescription: e.description,
      etag: e.tag,
    });
  };

  // to change the value of state enote
  const echange = (e) => {
    changeEnote({ ...enote, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* editNote Modal */}
      <div>
        <button
          type="button"
          ref={ref}
          style={{ display: "none" }}
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={enote.etitle}
                    onChange={echange}
                    placeholder="Meeting Notes: Project Planning - March 19th, 2023"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Enter Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={enote.edescription}
                    onChange={echange}
                    rows="8"
                    placeholder="In this meeting, we discussed the timeline and milestones for our project. We also assigned tasks to team members and set deadlines for completion."
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Enter Tag (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={enote.etag}
                    onChange={echange}
                    placeholder="project"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  ref={ref2}
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ReadMore Modal */}
      <div>
        <button
          type="button"
          ref={ref33}
          style={{ display: "none" }}
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
        >
          Launch demo modal
        </button>
        <div
          className="modal fade"
          id="exampleModal1"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {enote.etitle}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">{enote.edescription}</div>
              <div className="modal-footer">
                <p style={{fontWeight: 'bold'}}>Tags: {enote.etag}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The container that contains noteItem */}
      <div className="container">
        <h2 className="text-center text-light">Your Notes ({notes.length})</h2>
        <div className="row d-flex justify-content-center my-5">
          {notes.length !== 0 ? (
            notes.map((note) => {
              return (
                <NoteItem
                  key={note._id}
                  note={note}
                  click={handleUpdate}
                  kkk={handleMore}
                />
              );
            })
          ) : (
            <h4 className="text-center text-info">
              You don't have any notes. Create Some..
            </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
