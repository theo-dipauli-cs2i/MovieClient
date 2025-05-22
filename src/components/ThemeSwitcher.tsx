import { useState, useEffect } from "preact/hooks";

export function ThemeSwitcher() {

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function toggleDarkMode() {
    setDark((d) => !d);
  }

  return (
    <button
      class="btn btn-outline-secondary ms-auto"
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
