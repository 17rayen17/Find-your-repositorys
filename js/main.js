let username = document.querySelector(".searchField input");
let btnSearch = document.querySelector(".searchField button");
let identity = document.querySelector(".identity");
let noData = document.querySelector(".noData")
let showCards = document.querySelector(".showCards");
getReposiries();
btnSearch.onclick = ()=>{
  identity.innerHTML = "";
  showCards.innerHTML = "";
  noData.innerHTML = "";
  getReposiries();
}
window.location.href
function getReposiries(){
  fetch(`https://api.github.com/users/${username.value || "17rayen17"}/repos`)
  .then((res)=> res.json())
  .then((data)=>{
    if(data.length > 0){
      identity.innerHTML = `<div>
      <img src="${data[0]["owner"]["avatar_url"]}" alt="${data[0]["name"]}">
      <h1>${data[0]["name"]}</h1>
      </div>
      <button onclick="window.location.href ='${data[0]["html_url"]}'"><i class="fa-solid fa-eye"></i> Visit </button>`;
      data.forEach((el,i) => {
        if(el.visibility === "public"){
          showCards.innerHTML += `<div class="cards">
          <div class="titreCards">
          <a href="${el.html_url}">${el.name}</a>
          <div>
            <p>${el.visibility}</p>
          </div>
        </div>
        <div class="continueCards">
          <p>${el.language ? '<i class="fa-solid fa-code"></i> '+el.language : ""}</p>
          ${el.homepage ? `<button onclick="window.location.href ='${el.homepage}'"><i class="fa-solid fa-eye"></i>Visit app</button>` : ""}
        </div>
          </div>`;
        }
      });
    }else{
      noData.innerHTML =`<h1>Unfortunately, no data was found under the ${username.value}</h1>
      <span class="loader"></span>`
      noData.style.display = 'grid';
    }

  })
  .catch((err)=>{ console.error(err);})
}

document.querySelector(".logo").onclick=()=>{
  window.location.reload();
}