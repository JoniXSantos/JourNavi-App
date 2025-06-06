import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";


export const Countries = ({ dark }) => {
    const { store, actions } = useContext(Context);
    const user = store.user.id
    const [countries, setCountries] = useState([...store.countries].sort((a, b) => a.name.localeCompare(b.name)));

    useEffect(() => {
                actions.getData(user);
            }, []);

    return (
        <div className="container mt-3">
            <h1 className="mb-4">Countries</h1>
            <p>The world is wide, there are many new places to discover. Have you been to these countries? Which ones are your favorites?</p>
            <div className="d-flex justify-content-end">
                <div className="btn-group">
                    <button type="button" className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark w-100 text-center">
                        <li onClick={() => setCountries(store.countries.filter(c => store.toVisitCountries.includes(c.name)).sort((a, b) => a.name.localeCompare(b.name)))}><span className="dropdown-item navbar-drop" style={{ cursor: 'pointer' }}>Wish to visit</span></li>
                        <li onClick={() => setCountries(store.countries.filter(c => store.visitedCountries.includes(c.name)).sort((a, b) => a.name.localeCompare(b.name)))}><span className="dropdown-item navbar-drop" style={{ cursor: 'pointer' }}>Already visited</span></li>
                        <li onClick={() => setCountries(store.countries.filter(c => store.favoriteCountries.includes(c.name)).sort((a, b) => a.name.localeCompare(b.name)))}><span className="dropdown-item navbar-drop" style={{ cursor: 'pointer' }}>Favorites</span></li>
                        <li onClick={() => setCountries([...store.countries].sort((a, b) => a.name.localeCompare(b.name)))}><span className="dropdown-item navbar-drop" style={{ cursor: 'pointer' }}>Clear</span></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center row row-cols-1 row-cols-md-2 g-4 mt-1 mb-5">
                {countries.length !== 0 ? countries.map((item, index) => (
                    <div className={`card mx-2 text-center ${dark ? 'bg-dark' : 'bg-grayish'}`} style={{ width: '22rem' }} key={index}>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <img className="card-img-top mb-3" src={item.flag} style={{ width: '300px' }} />
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Capital</label>
                                </div>
                                <div className="col-auto">
                                    {item.capital}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Language(s)</label>
                                </div>
                                <div className="col-auto">
                                    {item.languages}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Currency(ies)</label>
                                </div>
                                <div className="col-auto">
                                    {item.currency}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Population</label>
                                </div>
                                <div className="col-auto">
                                    {item.population}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Continent(s)</label>
                                </div>
                                <div className="col-auto">
                                    {item.continents}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Region</label>
                                </div>
                                <div className="col-auto">
                                    {item.region}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Subregion</label>
                                </div>
                                <div className="col-auto">
                                    {item.subregion}
                                </div>
                            </div>
                            <div className="row g-3 align-items-center">
                                <div className="col-auto">
                                    <label className="col-form-label fw-bold">Timezone(s)</label>
                                </div>
                                <div className="col-auto">
                                    {item.timezones}
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type="button" title="Will Visit" className={`btn me-2 ${dark ? 'btn-light' : 'btn-dark'}`} onClick={!store.toVisitCountries.includes(item.name) && !store.visitedCountries.includes(item.name) ? () => actions.addToWishes(item.name) : () => actions.removeFromWishes(item.name)}><i className={`fa-solid fa-heart ${store.toVisitCountries.includes(item.name) ? 'text-danger' : ''}`}></i></button>
                                <button type="button" title="Visited" className={`btn me-2 ${dark ? 'btn-light' : 'btn-dark'}`} onClick={!store.visitedCountries.includes(item.name) ? () => actions.addToVisited(item.name) && actions.removeFromWishes(item.name) : () => actions.removeFromVisited(item.name) && actions.removeFromFavorites(item.name)}><i className={`fa-solid fa-check ${store.visitedCountries.includes(item.name) ? 'text-success' : ''}`}></i></button>
                                <button type="button" title="Favorite" className={`btn ${dark ? 'btn-light' : 'btn-dark'}`} onClick={!store.favoriteCountries.includes(item.name) && store.visitedCountries.includes(item.name) ? () => actions.addToFavorites(item.name) : () => actions.removeFromFavorites(item.name)}><i className={`fa-solid fa-star ${store.favoriteCountries.includes(item.name) ? 'text-warning' : ''}`}></i></button>
                            </div>
                        </div>
                    </div>
                )) :
                    <p className="text-center">
                        <strong>No country on the list.</strong>
                    </p>}
            </div>
        </div>
    )
}