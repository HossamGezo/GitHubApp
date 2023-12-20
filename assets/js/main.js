// ! ------------------------------------------- Variables

let getUserInput = document.querySelector(".get-userinput");
let getUserBtn = document.querySelector(".get-user");
let langBtn = document.querySelector(".languages");
let userHead = document.querySelector(".username-head");
let repoContent = document.querySelector(".repositories-container");
let url = "https://api.github.com";

// ! ------------------------------------------- Events

getUserBtn.addEventListener("click", getValue);
langBtn.addEventListener("click", getValue);

// ! ------------------------------------------- Functions

// ---------- Get Username Value Funciton
function getValue(e) {
  if (getUserInput.value) {
    if (e.target.getAttribute("data-search") === "username") {
      let username = getUserInput.value.trim();
      fetchGitHub(username, null, showData);
      getUserInput.value = "";
    }
  } else if (e.target.getAttribute("data-lang") === "javascript") {
    let lang = e.target.getAttribute("data-lang");
    fetchGitHub(null, lang, showData);
  } else if (e.target.getAttribute("data-lang") === "html") {
    let lang = e.target.getAttribute("data-lang");
    fetchGitHub(null, lang, showData);
  } else if (e.target.getAttribute("data-lang") === "css") {
    let lang = e.target.getAttribute("data-lang");
    fetchGitHub(null, lang, showData);
  } else if (e.target.getAttribute("data-lang") === "php") {
    let lang = e.target.getAttribute("data-lang");
    fetchGitHub(null, lang, showData);
  }
}

// ---------- Fetch Github Function
async function fetchGitHub (username, lang, showData) {
  if (username) {
    let response = await (await fetch(`${url}/users/${username}/repos`)).json();
    showData(username, lang, response);
  } else {
    let response = await (await fetch(`${url}/search/repositories?q=${lang}`)).json();
    showData(null, lang, response.items);
  }
};
fetchGitHub("HossamGezo", null, showData);

// ---------- Show Data Function
function showData(username, lang, data) {
  if (username) { 
    userHead.innerHTML = username;
  } else {
    userHead.innerHTML = lang;
  }
  repoContent.innerHTML = "";
  for (let i = 0; i < data.length; ++i) {
    repoContent.innerHTML += `
      <div id="${data[i].owner.login + "/" + data[i].name}" class="repo" ${data[i].open_issues_count === 0 ? "" : "onclick=showIssues(this.id)"}>
        <h4 class="repo-head">${data[i].name}</h4>
        <div class="repo-desc">
          <i class="fa-solid ${data[i].open_issues_count === 0 ? "fa-check true" : "fa-xmark false"}"></i>
          <span class="number-issues" ${data[i].open_issues_count === 0 ? "hidden" : ""}>${data[i].open_issues_count}</span>
        </div>
      </div>
      <!-- // Repo Desc -->
    `;
  }
}

// ---------- Show Issues Function
function showIssues(repoName) {
  window.location = `./issues.html?repo=${repoName}`;
}