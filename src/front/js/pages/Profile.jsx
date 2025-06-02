import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import NoPicture from "../../img/No Photo.png";
import { Link } from "react-router-dom";


export const Profile = ({ dark }) => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const isCurrentUser = !id;
    const user = isCurrentUser ? store.user : store.users.find(user => user.id === parseInt(id)) || {};
    const posts = isCurrentUser ? store.posts.filter(post => post.user_id === user.id) : store.posts.filter(post => post.user_id === parseInt(id));

    useEffect(() => {
        if (isCurrentUser) {
            actions.getData(user.id);
        } else {
            actions.getData(parseInt(id));
        }
    }, []);

    return (
        <div className="container my-3">
            <h1 className="mb-4">Profile</h1>
            <section className="h-100 gradient-custom-2">
                <div className="h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12">
                            <div className={`card ${dark ? 'bg-dark' : ''}`}>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#808080', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img src={user.picture ? user.picture : NoPicture}
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2 z-1"
                                            style={{ width: '150px' }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5>{user.name}</h5>
                                        <p>From {user.nationality ? user.nationality : 'somewhere'}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-body-tertiary">
                                    <div className="d-flex justify-content-end text-center py-1 text-body">
                                        <div>
                                            <p className={`mb-1 h5 ${dark ? 'text-white' : ''}`}>{posts.length}</p>
                                            <p className="small text-muted mb-0">{posts.length === 1 ? 'Post' : 'Posts'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="mb-5 text-body">
                                        <p className={`lead fw-normal mb-1 ${dark ? 'text-white' : ''}`}>About</p>
                                        <div className="p-4 bg-body-tertiary">
                                            <p className={`font-italic mb-1 ${dark ? 'text-white' : ''}`}>{user.about ? user.about : 'No description yet.'}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                                        <p className={`lead fw-normal mb-0 ${dark ? 'text-white' : ''}`}>Posts</p>
                                        <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                    </div>
                                    {posts.length === 0 ? <p className="text-center"><strong>No posts yet.</strong></p> : posts.map((item, index) => {
                                        return (
                                            <div key={index} className="mb-3">
                                                <ul>
                                                    <Link to={`/post/${item.id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                                        <li>{item.title}</li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}