import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { Pagination } from "../component/Pagination.jsx";


export const Posts = ({ dark }) => {
    const { store, actions } = useContext(Context);
    const posts = store.posts;
    const users = store.users;
    const currentUser = store.user;
    const comments = store.comments;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const images = store.images;
    const postsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice().reverse().slice(firstPostIndex, lastPostIndex);

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    const handleUpload = async (event) => {
        if (event.target.files.length) {
            const fileNum = event.target.files.length;
            setUploading(true);
            const success = await actions.uploadImages(event.target.files);
            if (success) {
                setUploading(false);
            };
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uploading) {
            const dataToSend = {
                title: title,
                description: description,
                images: images,
                user_id: currentUser.id
            };
            actions.createPost(dataToSend);
        } else {
            alert('Please wait for the images to finish uploading before submitting the post.');
            return;
        }
        const modal = document.getElementById("newPost");
        if (modal) {
            const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) bootstrapModal.hide();
        }
        setTitle('');
        setDescription('');
    }

    const handleReset = () => {
        setTitle('');
        setDescription('');
    }

    return (
        <div className="container mt-3">
            <h1 className="mb-4">Posts</h1>
            <p>Do you need any guidance in your journey? Here is the right place for it. You can also share your experiences.</p>
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
                                <input className={`mb-2 ps-3 w-100 ${dark ? 'bg-dark text-white border-0' : ''}`} value={title} onChange={e => setTitle(e.target.value)} style={{ height: '5vh', border: 'thin solid #D3D3D3' }} placeholder="Title" required />
                                <textarea className={`mb-2 px-3 w-100 ${dark ? 'bg-dark text-white border-0' : ''}`} value={description} onChange={e => setDescription(e.target.value)} style={{ height: '20vh', border: 'thin solid #D3D3D3' }} placeholder="Description" required />
                                {uploading ? 
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> 
                                    :
                                    (images.length > 0 ? 
                                        <div className="d-flex align-items-baseline">
                                            <label className="btn btn-dark me-3">
                                                Change Images
                                                <input type="file" className="d-none" multiple onChange={handleUpload} />
                                            </label>
                                            <p>{images.length > 1 ? `${images.length} images` : 'Image'} uploaded</p>
                                        </div>
                                    : 
                                        <label className="btn btn-dark">
                                            Select Images
                                            <input type="file" className="d-none" multiple onChange={handleUpload} />
                                        </label>
                                    )
                                }
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
            {currentPosts.length === 0 ? <p className="text-center"><strong>No posts yet.</strong></p> : currentPosts.map((item, index) => {
                const user = users.find(user => user.id === item.user_id)
                const postComments = comments.filter(comment => comment.post_id === item.id)

                return (
                    <div key={index} className={`card mb-3 ${dark ? 'bg-dark' : 'bg-grayish'}`}>
                        <div className="card-body">
                            <Link to={`/post/${item.id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                            <Link to={user.id === currentUser.id ? `/profile` : `/user/${item.user_id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{user.id === currentUser.id ? 'Myself' : user.name || user.email}</h6>
                            </Link>
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
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPosts={posts.length}
                postsPerPage={postsPerPage}
                dark={dark}
            />
        </div>
    )
}