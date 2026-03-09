import React from "react";
import './profileinfo.css';
import { getInitials } from "../../utils/helper";
import type { IUser } from "../../utils/user.types";

interface ProfileinfoProps {
    userinfo: IUser | null;
    onLogout: () => void;
}

export const Profileinfo: React.FC<ProfileinfoProps> = ({ userinfo, onLogout }) => {
    return (
     userinfo &&  ( <div className="userinfo-logout">
            <div className="userinfo">
                {getInitials(userinfo ? userinfo.fullName : "")}
            </div>
            <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>)
    )
}