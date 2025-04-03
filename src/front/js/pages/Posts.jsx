import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";


export const Posts = ({ dark, setDark }) => {
    const { store } = useContext(Context);
    const posts = store.posts;
    const users = store.users;
    const comments = store.comments;

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    return (
        <div className="mt-4 container">
            {posts.length === 0 ? '' : posts.map((item, index) => {
                const user = users.find(user => user.id === item.user_id)
                const postComments = comments.filter(comment => comment.post_id === item.id)
                
                return (
                    <div key={index} className={`card mb-3 ${dark ? 'bg-dark' : ''}`}>
                        <div className="card-body">
                            <Link to={`/post/${item.id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{user.name ? user.name : user.email}</h6>
                            <p className="card-text">{item.description}</p>
                            <div className="d-flex">
                                <p className="me-3"><small>{dateFormat(item.date)}</small></p>
                                <Link to={`/post/${item.id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                    <p><small>Comments ({postComments.length})</small></p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}