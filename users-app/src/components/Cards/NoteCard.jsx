import React from "react";
// import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  first_name,
  last_name,
  email,
  id,
  avatar,
  onEdit,
  onDelete,
  onPinNote,
  img
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">First Name : {first_name}</h6>
          <span className="text-sm text-slate-500">Last Name : {last_name}</span>
        </div>

        {/* <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-300"
          }`}
          onClick={onPinNote}
        /> */}
        <img class="w-10 h-10 rounded" src={avatar} alt="Default avatar"/>

      </div>
      <p className="text-xs text-slate-600 mt-2">Email : {email}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{id}</div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
