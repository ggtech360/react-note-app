import React from "react";

const CreateNote = (props) => {
  return (
    // A form for creating notes.
    <div className="my-5 py-3">
      <div className="text-light">
        <h1 className="text-center">Hi There!</h1>
        <div className="container hideIN fade-in display-hidden">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={props.note.title}
              onChange={props.change}
              placeholder="Meeting Notes: Project Planning - March 19th, 2023"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Enter Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={props.note.description}
              onChange={props.change}
              rows="8"
              placeholder="In this meeting, we discussed the timeline and milestones for our project. We also assigned tasks to team members and set deadlines for completion."
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Enter Tag (Optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={props.note.tag}
              onChange={props.change}
              placeholder="project"
            />
          </div>
          <div className="mb-3 text-center">
            <button className="btn btn-outline-light" onClick={props.submit}>
              Add Note
            </button>
          </div>
        </div>
        <div className="container text-center my-4">
          <span
            className="addnotebtn btn btn-outline-light"
            onClick={props.togglehide}
          >
            Create New Notes
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
