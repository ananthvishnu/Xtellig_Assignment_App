import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [allUsersInfo, setAllUsersInfo] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/1");

      if (response.data && response.data.data) {
        setUserInfo(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //get all users
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");

      if (response.data && response.data.data) {
        setAllUsersInfo(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserInfo();
    getAllUsers();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allUsersInfo.map((item, index) => {
            return (
              <NoteCard
                key={item.id}
                first_name={item.first_name}
                last_name={item.last_name}
                email={item.email}
                id={item.id}
                avatar={item.avatar}

                // isPinned={true}
                onEdit={() => {}}
                onDelete={() => {}}
                // onPinNote={() => {}}
              />
            );
          })}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgrounColor: "rgba(0,0,0,0.2",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden border"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllUsers={getAllUsers}
        />
      </Modal>
    </>
  );
};

export default Home;
