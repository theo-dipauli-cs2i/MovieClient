import { useState } from "preact/hooks";

export function ThemeSwitcher() {
  const [dark, setDark] = useState(false);
  function toggleDarkMode() {
    setDark((d) => {
      const newTheme = !d;
      document.body.setAttribute("data-bs-theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  }

  return (
    <button class="btn btn-outline-secondary ms-auto"
      type="button"
      onClick={toggleDarkMode}
    >
      {dark ? (
        <i class="bi bi-brightness-high-fill"></i>
      ) : (
        <i class="bi bi-moon-stars-fill"></i>
      )}
    </button>
  );
}
