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

(function () {
  var lists = {
    writing: document.getElementById("writing"),
    work: document.getElementById("work"),
  };
  var tabs = {
    writing: document.getElementById("tab-writing"),
    work: document.getElementById("tab-work"),
  };
  var panel = document.getElementById("panel");

  function show(name) {
    lists.writing.hidden = name !== "writing";
    lists.work.hidden = name !== "work";
    tabs.writing.setAttribute("aria-selected", name === "writing" ? "true" : "false");
    tabs.work.setAttribute("aria-selected", name === "work" ? "true" : "false");
    tabs.writing.tabIndex = name === "writing" ? 0 : -1;
    tabs.work.tabIndex = name === "work" ? 0 : -1;
    panel.setAttribute("aria-labelledby", "tab-" + name);
  }

  function current() {
    return location.hash === "#work" ? "work" : "writing";
  }

  tabs.writing.addEventListener("click", function () {
    if (location.hash !== "#writing") history.pushState(null, "", "#writing");
    show("writing");
  });
  tabs.work.addEventListener("click", function () {
    if (location.hash !== "#work") history.pushState(null, "", "#work");
    show("work");
  });

  document.querySelector(".switch").addEventListener("keydown", function (event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    var next = current() === "writing" ? "work" : "writing";
    history.pushState(null, "", "#" + next);
    show(next);
    tabs[next].focus();
  });

  window.addEventListener("hashchange", function () {
    show(current());
  });
  show(current());
})();
