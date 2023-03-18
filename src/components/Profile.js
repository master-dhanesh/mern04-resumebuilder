import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { async_uploadimage, _loading } from "../store/Actions/userActions";

const Profile = () => {
    const dispatch = useDispatch();
    const prevRef = useRef(null);
    const { user, isLoading } = useSelector((state) => state.userReducer);
    const [avatar, setAvatar] = useState(null);

    // useEffect(() => {}, [user]);

    const avatarhandler = (e) => {
        prevRef.current.src = URL.createObjectURL(e.target.files[0]);
        setAvatar(e.target.files[0]);
    };
    const UploadHandler = () => {
        const formdata = new FormData();
        formdata.set("avatar", avatar);
        dispatch(_loading(true));
        dispatch(async_uploadimage(formdata));
    };

    return isLoading ? (
        "Loading..."
    ) : (
        <div>
            <h3>Profile</h3>
            {JSON.stringify(user)}
            <h3>{user.name}</h3>

            <img
                className="profileimg"
                width={200}
                src={user.avatar.url}
                alt=""
            />

            <input onChange={avatarhandler} className="avatar" type="file" />
            <img ref={prevRef} height={100} src="" alt="" />
            <button onClick={UploadHandler}>Upload Image</button>
        </div>
    );
};

export default Profile;
