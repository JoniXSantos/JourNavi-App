import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useParams, useNavigate } from "react-router-dom";


export const Post = ({ dark, setDark }) => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const post = store.posts.find(p => p.id === parseInt(id)) || {};
    const user = store.users.find(u => u.id === post.user_id);
    const comments = store.comments.filter(comment => comment.post_id === post.id);
    const [comment, setComment] = useState('');
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(post.description);
    const navigate = useNavigate();

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

    const handleEdit = (e) => {
        e.preventDefault();
        const dataToSend = {
            description: description
        };
        actions.editPost(post.id, dataToSend)
        setEditing(false);
    }

    const deletePost = async () => {
        if (confirm('Are you sure you want to delete this post?') == true) {
            const success = await actions.removePost(post.id);
            if (success) {
                alert('The post was successfully deleted');
                navigate('/posts');
            } else {
                alert('Something went wrong');
            };
        }
    }

    const deleteComment = async (id) => {
        if (confirm('Are you sure you want to delete this comment?') == true) {
            const success = await actions.removeComment(id);
            if (success) {
                alert('The comment was successfully deleted');
            } else {
                alert('Something went wrong');
            };
        }
    }

    return (
        <div className="my-4 container">
            <div className={`card mb-3 ${dark ? 'bg-dark' : ''}`}>
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{user.name}</h6>
                    {
                    editing ? 
                    <form onSubmit={handleEdit}>
                        <input className="w-100" value={description} onChange={e => setDescription(e.target.value)} />
                        <button type="button" className="btn btn-secondary my-3 me-3" onClick={() => setEditing(false)}>Cancel</button>
                        <button type="submit" className="btn btn-dark my-3">Save</button>
                    </form>
                    :
                    <p className="card-text">{post.description}</p>
                    }
                    <div className="d-flex">
                        <p><small>{dateFormat(post.date)}</small></p>
                        <p className={`ms-auto ${store.user.id === post.user_id ? '' : 'd-none'} ${dark ? 'link-style' : 'main-link'}`} onClick={() => setEditing(true)}><small>Edit</small></p>
                        <p className={`ms-3 ${store.user.id === post.user_id ? '' : 'd-none'} ${dark ? 'link-style' : 'main-link'}`} onClick={deletePost}><small>Remove</small></p>
                    </div>
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
                                <h6 className="me-3"><small>({dateFormat(item.date)})</small></h6>
                            </div>
                            <div className="d-flex">
                                <p className="card-text">{item.content}</p>
                                <p className={`ms-auto me-3 icon-button ${store.user.id === item.user_id ? '' : 'd-none'}`} onClick={() => deleteComment(item.id)}><small><i className="fa-solid fa-trash"></i></small></p>
                            </div>
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}