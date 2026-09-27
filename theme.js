(function () {
  var KEY = "theme";
  var btn = document.getElementById("theme");
  var meta = document.querySelector('meta[name="theme-color"]');

  function read() {
    try {
      var t = localStorage.getItem(KEY);
      if (t === "dark" || t === "light") return t;
    } catch (e) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    if (meta) meta.setAttribute("content", theme === "dark" ? "#141210" : "#f6f1e8");
    var next = theme === "dark" ? "light" : "dark";
    btn.textContent = next;
    btn.setAttribute("aria-label", "Switch to " + next + " mode");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  var theme = read();
  apply(theme);
  btn.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(KEY, theme);
    } catch (e) {}
    apply(theme);
  });
})();
