if (
  localStorage.prefsDark === "true" ||
  (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    localStorage.prefsDark !== "false")
) {
  document.body.classList.add("dark");
}

const toggler = document.getElementById("theme-toggler");

toggler.addEventListener("click", () => {
  document.body.setAttribute(
    "style",
    "transition: background-color .3s linear;"
  );
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    localStorage.prefsDark = "false";
  } else {
    document.body.classList.add("dark");
    localStorage.prefsDark = "true";
  }
});
