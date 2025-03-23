let resizeTimeoutId;
window.addEventListener("resize", () => {
  document.documentElement.classList.add("is-resize");

  clearTimeout(resizeTimeoutId);

  resizeTimeoutId = setTimeout(() => {
    document.documentElement.classList.remove("is-resize");
  }, 500);
});

// new Rola("[data-rola-trigger]");
