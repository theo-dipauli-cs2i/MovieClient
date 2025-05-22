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
    const URL = "http://10.205.47.2:3002/v2/movies?page=1&pageSize=10";

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
                                items: {response.pageSize}
                            </span>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-primary mb-2" onClick={toggleDetails}>
                                {openDetails ? "-" : "+"}
                            </button>
                        </div>
                    </div>
                    <div className="row d-flex align-items-stretch">
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
                                <div className="col-md-4 mb-4" key={movie.movie_title + idx}>
                                    <div className="card h-100" style={{ width: "18rem" }}>
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
                                            <a href={movie.movie_imdb_link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
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