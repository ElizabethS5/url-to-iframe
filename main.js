const deploymentInput = document.getElementById("deployment");
const urlInput = document.getElementById("page-url");
const clearButton = document.getElementById("clear");
const saveDeploymentButton = document.getElementById("save");
const regex = /(\/modules\S+)/;

let defaultDeploymentString = deploymentInput.value;
let localDeploymentString = localStorage.getItem("deployment");
console.log(localDeploymentString);
let deploymentString;
if (localDeploymentString === null) {
  localStorage.setItem("deployment", defaultDeploymentString);
  deploymentString = defaultDeploymentString;
} else {
  deploymentString = localDeploymentString;
  deploymentInput.value = localDeploymentString;
}
let urlString = "";

urlInput.addEventListener("input", (e) => {
  urlString = urlInput.value.trim();
  let paths = urlString.match(regex);
  if (paths === null) return;
  let path = paths[0];
  let value =
    `<p><iframe style="width: 100%; height: 1024px" src="https://${deploymentString}${path}" width="100%" height="1024px" allowfullscreen="allowfullscreen" webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen"></iframe></p>`.toString();
  navigator.clipboard.writeText(value);
  console.log("copied to clipboard\n", value);
});

deploymentInput.addEventListener("input", (e) => {
  deploymentString = deploymentInput.value.trim();
});

clearButton.addEventListener("click", (e) => {
  urlString = "";
  urlInput.value = "";
});

saveDeploymentButton.addEventListener("click", (e) => {
  deploymentString = deploymentInput.value.trim();
  localStorage.setItem("deployment", deploymentString);
});
