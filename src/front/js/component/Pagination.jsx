import React from "react";


export const Pagination = ({ currentPage, setCurrentPage, totalPosts, postsPerPage, dark }) => {
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
    
    return (
        <div className={`d-flex justify-content-center align-items-center ${pages.length === 1 ? 'd-none' : ''}`} style={{ width: "100wh" }}>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'd-none' : ''}`}>
                        <span className="page-link" onClick={() => setCurrentPage(currentPage - 1)}><i className="fa-solid fa-arrow-left"></i></span>
                    </li>
                    {pages.map((page, index) => {
                        return <li className={`page-item ${currentPage === page ? 'active' : ''}`} key={index}><span className="page-link" onClick={() => setCurrentPage(page)}>{page}</span></li>
                    })}
                    <li className={`page-item ${currentPage === pages[pages.length - 1] ? 'd-none' : ''}`}>
                        <span className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><i className="fa-solid fa-arrow-right"></i></span>
                    </li>
                </ul>
            </nav>
        </div>
    )
};