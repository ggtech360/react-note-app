import { useContext } from "react";
import "./NoteItem.css";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, click, kkk} = props;

  return (
    <>
      {/* NoteItem element */}
      <div className="col-md-3 my-3">
        <div className="card border-2 border-info text-light">
          <div className="card-body">
            <h5 className="card-title mx-2">{note.title}</h5>
            <p className="card-description">
              {note.description.slice(0, 27)}...
            </p>
          <button className="btn btn-sm btn-outline-info" onClick={()=>{kkk(note)}}>Read more</button>
          </div>
          <div className="card-footer d-flex justify-content-between bg-info text-dark text-bold">
            {note.tag}
            <div className="d-flex justify-content-end align-items-center">
              <i
                className="mx-2 fa-solid cursor-pointer fa-pen-to-square"
                onClick={()=>{click(note)}}
              ></i>
              <i
                className="mx-2 fa-solid cursor-pointer fa-trash"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
