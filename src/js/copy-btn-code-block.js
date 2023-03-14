const preCodeBlocks = document.querySelectorAll('pre[class*="language-"]');

function fallBackCopyToClipboard(value) {
  const textArea = document.createElement("textarea");
  textArea.value = value;

  textArea.style.top = "0";
  textArea.style.left = "-9999px";
  textArea.style.position = "absolute";
  textArea.setAttribute("readonly", "");

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export function copyToClipboard(value) {
  if (!navigator.clipboard) {
    /**
     * WA for navigator which have no native clipboard support.
     */
    return fallBackCopyToClipboard(value);
  }
  navigator.clipboard
    .writeText(value)
    .catch((err) => console.error("Async: Could not copy text: ", err));
}

function handleCopyClick(evt) {
  const { children } = evt.target.parentElement;
  const { innerText } = Array.from(children)[0];
  copyToClipboard(innerText);
}

preCodeBlocks.forEach((pre) => {
  const copy = document.createElement("button");
  copy.classList.add("prism-copy-button");
  copy.setAttribute("ariaLabel", "Copy code snippet to clipboard");
  copy.innerHTML = "Copy";
  copy.addEventListener("click", (evt) => {
    const { innerText } = Array.from(pre.children)[0];
    copyToClipboard(innerText);
    copy.innerHTML = "✅ Copied";
    setTimeout(() => {
      copy.innerHTML = "Copy";
    }, 1000);
  });
  pre.append(copy);
});
