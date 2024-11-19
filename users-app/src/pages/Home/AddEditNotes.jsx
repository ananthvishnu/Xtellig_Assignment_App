import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";

const AddEditNotes = ({ noteData, type, getAllUsers, onClose }) => {
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [error, setError] = useState(null);

  //Add New User
  const addNewUser = async () => {
    try {
      const response = await axiosInstance.post("/add-user", {
        first_name,
        last_name,
        email,
        avatar,
      });

      if (response.data && response.data.data) {
        getAllUsers();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        setError(error.response.data.data.message);
      }
    }
  };

  //Edit Note
  const editNode = async () => {
    // Edit note logic here
  };

  const handleAddNote = () => {
    if (!first_name) {
      setError("Please enter the first name.");
      return;
    }
    if (!last_name) {
      setError("Please enter the last name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email address.");
      return;
    }

    if (!avatar) {
      setError("Please enter the avatar url.");
      return;
    }

    setError("");

    if (type === "edit") {
      editNode();
    } else {
      addNewUser();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">FIRST NAME</label>
        <input
          type="text"
          className="text-sm text-slate-950 input-box"
          placeholder=""
          value={first_name}
          onChange={({ target }) => setFirst_Name(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">LAST NAME</label>
        <input
          type="text"
          className="text-sm text-slate-950 input-box"
          placeholder=""
          value={last_name}
          onChange={({ target }) => setLast_Name(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">EMAIL</label>
        <input
          type="text"
          placeholder=""
          className="text-sm text-slate-950 input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">AVATAR URL</label>
        <input
          type="text"
          className="text-sm text-slate-950 input-box"
          placeholder=""
          value={avatar}
          onChange={({ target }) => setAvatar(target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
