import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3030");

const Support = () => {
    const inputref = useRef();
    const [room, setRoom] = useState("");
    const [online, setOnline] = useState([]);

    const [message, setMessage] = useState("");
    const [recieved, setRecieved] = useState([]);

    const JoinRoomHandler = (e) => {
        e.preventDefault();
        inputref.current.style.display = "none";
        socket.emit("new user", room);
    };

    const messageHandler = (e) => {
        e.preventDefault();
        socket.emit("send message", message);
        socket.on("new message", (data) => {
            setRecieved(data);
        });
    };

    useEffect(() => {
        socket.on("get users", (data) => {
            setOnline(data);
        });
        socket.on("new message", (data) => {
            setRecieved(data);
        });
    }, []);
    console.log(recieved);
    return (
        <div className="container mt-5 ">
            <form ref={inputref} onSubmit={JoinRoomHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setRoom(e.target.value)}
                    value={room}
                />
                <button>Join Room</button>
            </form>

            {/*  */}
            <div>
                <ul className="alert alert-success">
                    {online.map((u, i) => (
                        <li key={i}>{u}</li>
                    ))}
                </ul>
                <hr />
                <form onSubmit={messageHandler}>
                    <input
                        type="text"
                        placeholder="message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button>Send Message</button>
                </form>
                <hr />
                <h1 className="f-1 fw-light mb-3">Messages: </h1>
                <div className="alert alert-dark">
                    {recieved.map((m, i) => (
                        <p key={i}>
                            <strong>{m.user}:</strong>
                            <span>{m.msg}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Support;
