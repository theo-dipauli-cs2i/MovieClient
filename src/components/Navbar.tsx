export function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div class="container-fluid">
                    <img class="img-fluid me-2" src="/preact.svg" alt="" />
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}