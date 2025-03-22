import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Profile = () => {
    const { store } = useContext(Context);

    return (
        <div>
            <p><b>This page is currently unavailable.</b></p>
        </div>
    )
}