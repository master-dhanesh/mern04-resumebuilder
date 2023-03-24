import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Homepage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);
    const [show, setShow] = useState(false);

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, [isAuthenticated]);

    return (
        <div
            style={{ height: "100vh" }}
            className="container mt-5 bg-light p-5"
        >
            <motion.div
                style={{
                    width: "5vmax",
                    height: "5vmax",
                    backgroundColor: "red",
                }}
                animate={{
                    x: 100,
                    y: 0,
                    scale: 1.1,
                    rotate: 90,
                }}
                transition={{ ease: "easeOut", duration: 2 }}
            />
            <hr />
            <button className="mb-3" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
            </button>
            <AnimatePresence>
                {show && (
                    <motion.div
                        whileInView={{
                            opacity: 1,
                            transition: { duration: 2 },
                        }}
                        animate={{ y: 500, opacity: 0 }}
                        // drag
                        // whileDrag={{ x: 100 }}
                        // dragElastic={0.2}
                        // dragMomentum={false}
                        // dragTransition={{
                        //     bounceStiffness: 600,
                        //     bounceDamping: 10,
                        // }}
                        // whileHover={{ scale: 1.2, transition: { duration: 2 } }}
                        // initial={{ opacity: 0, x: -10, y: -10 }}
                        // animate={{ opacity: 1, x: 0, y: 0 }}
                        // exit={{ opacity: 0, x: 10, y: 10 }}
                        style={{
                            width: "5vmax",
                            height: "5vmax",
                            backgroundColor: "black",
                        }}
                    ></motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Homepage;
