import { useState } from "preact/hooks";
import type { ApiResponse } from "../types/ApiResponse";
import { FetchComponent } from "./FetchComponent";

type Actor = { name: string; facebook_likes: number };
type Movie = {
    movie_title: string;
    imdb_score: number;
    title_year: number;
    director_name: string;
    country: string;
    duration: number;
    movie_imdb_link: string;
    genres: string[];
    actors: Actor[];
    plot_keywords: string[];
};

export function Movies() {
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [page, setPage] = useState(1);
    const URL = `http://10.205.47.2:3002/v2/movies?page=${page}`;

    function parseMovie(data: any): Movie | null {
        if (!data) return null;
        return {
            movie_title: data.movie_title,
            imdb_score: data.imdb_score,
            title_year: data.title_year,
            director_name: data.director_name,
            country: data.country,
            duration: data.duration,
            movie_imdb_link: data.movie_imdb_link,
            genres: Array.isArray(data.genres) ? data.genres : [],
            actors: Array.isArray(data.actors) ? data.actors : [],
            plot_keywords: Array.isArray(data.plot_keywords) ? data.plot_keywords : [],
        };
    }

    function toggleDetails() {
        setOpenDetails((prev) => !prev);
    }

    return (
        <>
            <FetchComponent url={URL} onData={setResponse} />
            {response && Array.isArray(response.data) && (
                <>
                    <div>
                        <h1>Movies</h1>
                        <div className="d-inline-flex align-items-center mb-2">
                            <span className="badge rounded-pill bg-primary">
                                items: {response.itemCount}
                            </span>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination user-select-none">
                                <li className={`page-item${page === 1 ? " disabled" : ""}`}>
                                    <button type="button" className="page-link" onClick={() => page > 1 && setPage(1)} tabIndex={page === 1 ? -1 : 0} disabled={page === 1}>&lt;&lt;</button>
                                </li>
                                <li className={`page-item${page === 1 ? " disabled" : ""}`}>
                                    <button type="button" className="page-link" onClick={() => page > 1 && setPage(page - 1)} tabIndex={page === 1 ? -1 : 0} disabled={page === 1}>&lt;</button>
                                </li>
                                {(() => {
                                    const pages = [];
                                    const total = response.pages;
                                    let start = Math.max(1, page - 2);
                                    let end = Math.min(total, start + 4);
                                    if (end - start < 4) {
                                        start = Math.max(1, end - 4);
                                    }
                                    for (let p = start; p <= end; p++) {
                                        pages.push(
                                            <li key={p} className={`page-item${p === page ? " active" : ""}`}>
                                                <button
                                                    type="button"
                                                    className="page-link"
                                                    onClick={() => setPage(p)}
                                                >
                                                    {p}
                                                </button>
                                            </li>
                                        );
                                    }
                                    return pages;
                                })()}
                                <li className={`page-item${page === response.pages ? " disabled" : ""}`}>
                                    <button type="button" className="page-link" onClick={() => page < response.pages && setPage(page + 1)} tabIndex={page === response.pages ? -1 : 0} disabled={page === response.pages}>&gt;</button>
                                </li>
                                <li className={`page-item${page === response.pages ? " disabled" : ""}`}>
                                    <button type="button" className="page-link" onClick={() => page < response.pages && setPage(response.pages)} tabIndex={page === response.pages ? -1 : 0} disabled={page === response.pages}>&gt;&gt;</button>
                                </li>
                            </ul>
                        </nav>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-primary mb-2" onClick={toggleDetails}>
                                {openDetails ? "-" : "+"}
                            </button>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {response.data.map((rawMovie: any, idx: number) => {
                            const movie = parseMovie(rawMovie);
                            if (!movie) return null;

                            let badgeColor = "bg-success";
                            if (movie.imdb_score < 4) {
                                badgeColor = "bg-danger";
                            } else if (movie.imdb_score < 5) {
                                badgeColor = "bg-warning text-dark";
                            }

                            return (
                                <div className="col h-100" key={movie.movie_title + idx}>
                                    <div className="card h-100">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h2 className="mb-0">{movie.movie_title}</h2>
                                            <br />
                                            <span className={`badge ${badgeColor} ms-2`} style={{ width: "3rem" }}>
                                                <p className="mb-0">{movie.imdb_score}</p>
                                            </span>
                                        </div>

                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <i className="bi bi-calendar"></i> Year: {movie.title_year}
                                            </li>
                                            <li className="list-group-item">
                                                <i className="bi bi-person-fill"></i> Director: {movie.director_name}
                                            </li>
                                            <li className="list-group-item">
                                                <i className="bi bi-flag-fill"></i> Country: {movie.country}
                                            </li>
                                            <li className="list-group-item">
                                                <i className="bi bi-film"></i> Duration: {movie.duration} min
                                            </li>

                                            {openDetails && (
                                                <>
                                                    <li className="list-group-item">
                                                        Genres:
                                                        <br />
                                                        {movie.genres.map((g, i) => (
                                                            <span key={i} className="badge bg-info text-dark me-1">{g}</span>
                                                        ))}
                                                        <br />
                                                        Plot Keywords:
                                                        <br />
                                                        {movie.plot_keywords.map((p, i) => (
                                                            <span key={i} className="badge bg-warning text-dark me-1">{p}</span>
                                                        ))}
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                        <div className="card-footer">
                                            <a href={movie.movie_imdb_link} className="btn btn-outline-secondary" target="_blank" rel="noopener noreferrer">
                                                Details on IMDB
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </>
            )}
        </>
    );
}