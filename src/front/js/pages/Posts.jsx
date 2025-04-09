import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link, useNavigate } from "react-router-dom";


export const Posts = ({ dark, setDark }) => {
    const { store, actions } = useContext(Context);
    const posts = store.posts;
    const users = store.users;
    const comments = store.comments;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            title: title,
            description: description,
            user_id: store.user.id
        };
        actions.createPost(dataToSend);
        const modal = document.getElementById("newPost");
		if (modal) {
			const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
			if (bootstrapModal) bootstrapModal.hide();
		}
    }

    const handleReset = () => {
        setTitle('');
        setDescription('');
    }

    return (
        <div className="mt-4 container">
            <h1>Posts</h1>
            <div className="d-flex justify-content-end mb-4">
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#newPost">
                    New Post
                </button>
            </div>
            <div className="modal fade" id="newPost">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: '#FE5558' }}>
                            <h5 className="modal-title">New Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={`modal-body ${dark ? 'bg-black' : ''}`}>
                                <input className={`mb-2 ps-3 ${dark ? 'bg-dark text-white' : ''}`} value={title} onChange={e => setTitle(e.target.value)} style={{width: '100%', height: '5vh', border: 'thin solid #D3D3D3'}} placeholder="Title" required />
                                <textarea className={`mb-2 px-3 ${dark ? 'bg-dark text-white' : ''}`} value={description} onChange={e => setDescription(e.target.value)} style={{width: '100%', height: '20vh', border: 'thin solid #D3D3D3'}} placeholder="Description" required />
                            </div>
                            <div className="modal-footer" style={{ background: '#FE5558' }}>
                                <button type="button" onClick={handleReset} className="btn btn-secondary me-2">
                                    Reset
                                </button>
                                <button type="submit" className="btn btn-dark">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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