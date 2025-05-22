import { useLocation } from "preact-iso";

export function NotFound() {
    const location = useLocation();
    return (
        <div class="d-flex mt-5 justify-content-center align-items-center">
            <div class="text-center">
                <h1>Oops, 404 error</h1>
                <p>
                    Page <span class="fw-bold text-danger">{location.path}</span> not found
                </p>
                <a href="/" class="btn btn-primary mt-3">
                    <i class="bi bi-house"></i> Back to home page
                </a>
            </div>
        </div>
    );
}