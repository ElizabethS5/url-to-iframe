const domainInput = document.getElementById("domain");
const urlInput = document.getElementById("page-url");
const clearButton = document.getElementById("clear");
const savedomainButton = document.getElementById("save");
const messageDiv = document.getElementById("message");
const regex = /\/modules\S+index\.html/;

// let defaultdomainString = domainInput.value;
let domainString = "";
let localdomainString = localStorage.getItem("domain");
if (localdomainString !== null) {
  domainString = localdomainString;
  domainInput.value = localdomainString;
  urlInput.disabled = false;
}
let urlString = "";

urlInput.addEventListener("input", (e) => {
  urlString = urlInput.value.trim();
  let paths = urlString.match(regex);
  if (paths === null) return;
  let path = paths[0];
  let value =
    `<p><iframe style="width: 100%; height: 1024px" src="https://${domainString}${path}" width="100%" height="1024px" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></p>`.toString();
  navigator.clipboard.writeText(value);
  showMessage("iframe copied to clipboard");
});

urlInput.addEventListener("mouseenter", (e) => {
  urlInput.focus();
});

domainInput.addEventListener("input", (e) => {
  domainString = domainInput.value.trim();
  if (domainString === "") {
    urlInput.disabled = true;
  } else {
    urlInput.disabled = false;
  }
});

clearButton.addEventListener("click", clearUrlInput);

savedomainButton.addEventListener("click", (e) => {
  domainString = domainInput.value.trim();
  localStorage.setItem("domain", domainString);
  showMessage("domain saved to local storage");
});

function showMessage(message) {
  messageDiv.innerText = message;
  messageDiv.classList.remove("fade-out");
  messageDiv.classList.add("fade-in");
  setTimeout((e) => {
    messageDiv.classList.remove("fade-in");
    messageDiv.classList.add("fade-out");
    clearUrlInput();
  }, 1500);
  setTimeout((e) => {
    messageDiv.innerText = "";
  }, 3000);
}

function clearUrlInput() {
  urlString = "";
  urlInput.value = "";
}
