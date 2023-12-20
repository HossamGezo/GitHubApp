let repoName = window.location.search.split("=")[1];
let repoContent = document.querySelector(".repositories-container");
let url = "https://api.github.com";

async function fetchIssues(repoName) {
  let response = await (await fetch(`${url}/repos/${repoName}/issues`)).json();
  showIssues(response);
};
fetchIssues(repoName);

function showIssues(data) {
  repoContent.innerHTML = "";
  for (let i = 0; i < data.length; ++i) {
    repoContent.innerHTML += `
      <div class="repo">
        <h4 class="repo-head">${data[i].title}</h4>
      </div>
      <!-- // Repo Desc -->
    `;
  }
}