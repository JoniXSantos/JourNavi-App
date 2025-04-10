import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";


export const Post = ({ dark, setDark }) => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const post = store.posts.find(p => p.id === parseInt(id)) || {};
    const user = store.users.find(u => u.id === post.user_id);
    const comments = store.comments.filter(comment => comment.post_id === post.id);
    const [comment, setComment] = useState('');

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            content: comment,
            user_id: store.user.id,
            post_id: post.id
        };
        actions.addComment(dataToSend);
        setComment('');
    }

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
            <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <input className={`p-3 form-control ${dark ? 'bg-dark border-0 text-white' : ''}`} style={{height: '5vh', border: 'thin solid #D3D3D3'}} placeholder="Write your comment..." value={comment} onChange={e => setComment(e.target.value)} />
                <button type="submit" className={`btn ${dark ? 'btn-secondary' : 'btn-dark'}`}>
                    Add Comment
                </button>
            </div>
            </form>
            {comments.length === 0 ? <p className="ms-3">No comments yet.</p> : comments.slice().reverse().map((item, index) => {
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