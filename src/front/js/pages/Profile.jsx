import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import NoPicture from "../../img/No Photo.png";
import { Link } from "react-router-dom";
import { Pagination } from "../component/Pagination.jsx";


export const Profile = ({ dark }) => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const countries = store.countries;
    const isCurrentUser = !id;
    const user = isCurrentUser ? store.user : store.users.find(user => user.id === parseInt(id)) || {};
    const posts = isCurrentUser ? store.posts.filter(post => post.user_id === user.id) : store.posts.filter(post => post.user_id === parseInt(id));
    const postsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice().reverse().slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        if (isCurrentUser) {
            actions.getData(user.id);
        } else {
            actions.getData(parseInt(id));
        }
    }, []);

    const dateFormat = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-Es");
    };

    return (
        <div className="container mt-3 mb-4">
            <h1 className="mb-4">Profile</h1>
            <section className="h-100 gradient-custom-2">
                <div className="h-100">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12">
                            <div className={`card ${dark ? 'bg-dark' : 'bg-grayish'}`}>
                                <div className={`rounded-top text-white d-flex flex-row ${dark ? 'bg-gray' : 'bg-dark'}`} style={{ backgroundColor: '#808080', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <img src={user.picture ? user.picture : NoPicture}
                                            alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2 z-1"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <h5>{user.name}</h5>
                                        <p>From {user.nationality ? user.nationality : 'somewhere'}</p>
                                    </div>
                                </div>
                                <div className="p-4 d-flex justify-content-end">
                                    <div className="d-flex justify-content-end text-center py-1 text-body me-5">
                                        <div data-bs-toggle="modal" data-bs-target="#visited">
                                            <p className={`mb-1 h5 main-link ${dark ? 'text-white' : ''}`}>{user.visited_countries.length}</p>
                                            <p className="small text-muted mb-0">Visited <br />{posts.length === 1 ? 'Country' : 'Countries'}</p>
                                        </div>
                                        <div className="modal fade" id="visited">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header" style={{ background: '#FE5558' }}>
                                                        <h5 className="modal-title">Visited Countries</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ul className="list-unstyled text-start">
                                                            {user.visited_countries.length === 0 ? <li>No country on the list.</li> : ''}
                                                            {countries.filter(c => user.visited_countries.includes(c.name)).map((country, index) => (
                                                                <li key={index} className={`text-body ${dark ? 'text-white' : ''}`}>
                                                                    <div className="d-flex align-items-baseline">
                                                                        <img className="card-img-top me-2" src={country.flag} style={{ width: '25px' }} />
                                                                        <span className="me-1">{country.name}</span>
                                                                        <i className={`fas fa-star text-warning ${!user.favorite_countries.includes(country.name) ? 'd-none' : ''}`} title="Favorite"></i>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end text-center py-1 text-body me-3">
                                        <div>
                                            <p className={`mb-1 h5 ${dark ? 'text-white' : ''}`}>{posts.length}</p>
                                            <p className="small text-muted mb-0">{posts.length === 1 ? 'Post' : 'Posts'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-4">
                                    <div className="mb-5 text-body">
                                        <div className={`p-1 ps-4 pt-2 rounded text-white ${dark ? 'bg-gray' : 'bg-dark'}`}>
                                            <p className={`lead fw-normal mb-1 ${dark ? 'text-white' : ''}`}>About</p>
                                        </div>
                                        <div className="p-4">
                                            <p className={`mb-1 text-center ${dark ? 'text-white' : ''}`}><strong>{!user.about ? 'No description yet.' : ''}</strong></p>
                                            <p className={`mb-1 ${dark ? 'd-none' : ''}`}>{user.about ? user.about : ''}</p>
                                        </div>
                                    </div>
                                    <div className={`p-1 ps-4 pt-2 rounded text-white ${dark ? 'bg-gray' : 'bg-dark'}`}>
                                        <p className={`lead fw-normal mb-0 ${dark ? 'text-white' : ''}`}>Posts</p>
                                    </div>
                                    <div className="p-4 pb-1">
                                        <ul className="list-group list-group-flush">
                                            {posts.length === 0 ? <p className="text-center"><strong>No posts yet.</strong></p> : currentPosts.map((item, index) => {
                                                return (
                                                    <li key={index} className={`list-group-item d-flex justify-content-between ${dark ? 'bg-dark text-white' : 'bg-grayish'}`}>
                                                        <Link to={`/post/${item.id}`} className={`${dark ? 'link-style' : 'main-link'}`}>
                                                            <p>{item.title}</p>
                                                        </Link>
                                                        <p>({dateFormat(item.date)})</p>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <Pagination
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        totalPosts={posts.length}
                                        postsPerPage={postsPerPage}
                                        dark={dark}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}