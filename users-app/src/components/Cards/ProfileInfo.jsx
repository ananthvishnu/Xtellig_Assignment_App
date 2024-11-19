import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-cemter gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {" "}
        {getInitials(userInfo?.first_name)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.first_name}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
