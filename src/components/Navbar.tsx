import { useLocation } from 'preact-iso';
import preactLogo from '../assets/preact.svg';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Navbar() {

    const location = useLocation();


    const isActive = (path: string) => location.path === path;

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movies' },
        { label: 'Genres', path: '/genres' },
        { label: 'Countries', path: '/countries' }
    ];

    return (
        <>
            <nav class={`navbar navbar-expand-lg mb-3 bg-body-tertiary`}>
                <div class="container-fluid">
                    <img class="img-fluid me-2" src={preactLogo} alt="" />
                    <a class="navbar-brand" href="/">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav me-auto">
                            {navItems.map(item => (
                                <li class="nav-item">
                                    <a class={`nav-link${isActive(item.path) ? ' active' : ''}`} href={item.path}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <ThemeSwitcher />
                    </div>
                </div>
            </nav>
        </>
    )
}