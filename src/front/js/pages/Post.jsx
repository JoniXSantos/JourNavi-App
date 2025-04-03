import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";


export const Post = ({ dark, setDark }) => {
    const { store } = useContext(Context);
    const { id } = useParams();
    const post = store.posts.find(p => p.id === parseInt(id)) || {};
    const user = store.users.find(u => u.id === post.user_id);
    const comments = store.comments.filter(comment => comment.post_id === post.id);

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    return (
        <div className="my-4 container">
            <div className={`card mb-3 ${dark ? 'bg-dark' : ''}`}>
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{user.name}</h6>
                    <p className="card-text">{post.description}</p>
                    <p><small>{dateFormat(post.date)}</small></p>
                </div>
            </div>
            <h5 className="ms-3">Comments ({comments.length}):</h5>
            {comments.length === 0 ? <p className="ms-3">No comments yet.</p> : comments.map((item, index) => {
                const writer = store.users.find(u => u.id === item.user_id)

                return (
                    <div key={index} className={`card mb-1 ${dark ? 'bg-dark' : ''}`}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title">{writer.name}</h6>
                                <h6><small>({dateFormat(item.date)})</small></h6>
                            </div>
                            <p className="card-text">{item.content}</p>
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}