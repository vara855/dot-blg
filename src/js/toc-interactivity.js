window.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("article > h2[id], h3[id]");
  // Todo: Update not only in desktop view.
  const observer = new IntersectionObserver((entries) => {
    // console.log(entries);
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      if (entry.intersectionRatio > 0) {
        document
          .querySelector(`.post-toc nav li a[href="#${id}"]`)
          .parentElement.classList.add("active-toc-item");
      } else {
        document
          .querySelector(`.post-toc nav li a[href="#${id}"]`)
          .parentElement.classList.remove("active-toc-item");
      }
    });
  });

  headings.forEach((articleHeader) => {
    observer.observe(articleHeader);
  });
});
