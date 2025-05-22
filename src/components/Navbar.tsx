import preactLogo from '../assets/preact.svg';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {

    return (
        <>
            <nav class={`navbar navbar-expand-lg mb-3`}>
                <div class="container-fluid">
                    <img class="img-fluid me-2" src={preactLogo} alt="" />
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/genres">Genres</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/countries">Countries</a>
                            </li>
                        </ul>
                        <ThemeSwitcher />
                    </div>
                </div>
            </nav>
        </>
    )
}