import { removeAnime } from "./removeAnime.js";
export { main, addanimeAside };
function main() {
  const search = document.getElementById("search");
  const btn = document.getElementById("searchBtn");
  const mainContainer = document.querySelector(".main_container");
  const all_content = document.getElementById("all_content");
  const popover = document.getElementById("popover");
  const popoverText = document.getElementById("popoverText");
  const loading = document.getElementById("loading");

  btn.addEventListener("click", mainFetch);
  all_content.addEventListener("keydown", searchKey);

  document.addEventListener("DOMContentLoaded", loader);

  function loader() {
    loading.setAttribute("class", "loading");
  }
  function removeLoader() {
    loading.removeAttribute("class");
  }

  let result = "";
  let IDedAnime = JSON.parse(localStorage.getItem("ids")) || [];

  let savedAnime = JSON.parse(localStorage.getItem("savedAnime")) || [];

  function searchKey(event) {
    if (event.key === "Enter") {
      mainFetch();
    }
  }

  function checkNetwork() {
    popover.style.height = "fit-content";
    popover.style.width = "250px";
    popover.style.opacity = "1";
    popover.style.backgroundColor = "red";
    popoverText.innerText = "Pls Check Your Network";
    popoverText.style.color = "white";
    function returnPop() {
      popover.style.height = "0";
      popover.style.width = "0";
      popover.style.opacity = "0";
    }
    setTimeout(returnPop, 5000);
  }

  async function firstMain() {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=one punch man&sfw`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      result = data.data;
      mainFetch();
      removeLoader();
    } catch (error) {
      checkNetwork();
      removeLoader();
    }
  }
  firstMain();

  async function mainFetch() {
    mainContainer.innerHTML = "";
    const searched = search.value;
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searched}&sfw`
    );
    const data = await response.json();
    result = data.data;

    // console.log(result);

    result.map((anime) => {
      mainContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="main_content">
              <div class="frontSide">
               <img src="${anime.images.jpg.large_image_url}" />
              </div>
              <div class="backSide">
                <div class="backSide_header">
                  <p class="anime_title">
                   ${anime.title}
                  </p>
                </div>
                <div class="backSide_main">
                  <div class="animeDetails">
                    <p>
                      ${anime.synopsis}
                    </p>
                  </div>
                  <div class="animeMoreDetails">
                    <div class="animeSmallImg">
                      <img
                        src="${anime.images.jpg.small_image_url}"
                      />
                    </div>
                    <div class="animeInfo">
                      <p>Rating: <span>${anime.rating}</span></p>
                      <p>Duration: <span>${anime.duration}</span></p>
                      <p>Episodes: <span>${anime.episodes}</span></p>
                      <p>Status: <span>${anime.status}</span></p>
                      <p>Type: <span>${anime.type}</span></p>
                    </div>
                    <div class="animeFooter">
                      <a href="${anime.trailer.url}" target="_blank">
                        <button>Play Trailer</button>
                      </a>
                      <button class="booklistBtn" id="${anime.mal_id}">Booklist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
`
      );

      const saveBtn = document.getElementById(`${anime.mal_id}`);
      saveBtn.addEventListener("click", () => saveAnime(`${anime.mal_id}`));
    });

    function saveAnime(id) {
      const animeToAdd = result.find((anime) => anime.mal_id == id);

      // if (IDedAnime.some((value) => value === id)) {
      //   alert("Anime is already saved.");
      //   return;
      // }

      IDedAnime = JSON.parse(localStorage.getItem("ids")) || [];
      savedAnime = JSON.parse(localStorage.getItem("savedAnime")) || [];

      if (IDedAnime.length !== null) {
        for (let i = 0; i <= IDedAnime.length - 1; i++) {
          if (IDedAnime[i] == id) {
            popover.style.height = "fit-content";
            popover.style.width = "250px";
            popover.style.opacity = "1";
            popover.style.backgroundColor = "yellow";
            popoverText.innerText = "Anime Already Added To List";
            popoverText.style.color = "orange";
            function returnPop() {
              popover.style.height = "0";
              popover.style.width = "0";
              popover.style.opacity = "0";
            }
            setTimeout(returnPop, 2000);

            return;
          }
        }
      }

      popover.style.height = "fit-content";
      popover.style.width = "250px";
      popover.style.opacity = "1";
      popover.style.backgroundColor = "rgb(0, 201, 0)";
      popoverText.innerText = "Anime has been Saved";

      function returnPop() {
        popover.style.height = "0";
        popover.style.width = "0";
        popover.style.opacity = "0";
      }
      setTimeout(returnPop, 2000);

      IDedAnime.push(animeToAdd.mal_id);
      localStorage.setItem("ids", JSON.stringify(IDedAnime));

      savedAnime = savedAnime.filter((anime) => anime.mal_id !== id);

      savedAnime.push(animeToAdd);

      localStorage.setItem("savedAnime", JSON.stringify(savedAnime));
      addanimeAside();
    }
  }

  function addanimeAside() {
    const asideMain = document.getElementById("asideMain");
    asideMain.innerHTML = "";
    savedAnime.map((anime, index) => {
      asideMain.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="asideContent">
              <div class="asideImage">
                <img src="${anime.images.jpg.large_image_url}" />
              </div>
              <div class="asideInfo">
                <div class="anime_title">${anime.title}</div>
                <button id="${anime.title}">Remove From List</button>
                <details>
                  <summary>Details</summary>
                  <p>Rating: <span>${anime.rating}</span></p>
                  <p>Duration: <span>${anime.duration}</span></p>
                  <p>Episodes: <span>${anime.episodes}</span></p>
                  <p>Status: <span>${anime.status}</span></p>
                  <p>Type: <span>${anime.type}</span></p>
                </details>

              <div class="pc_version_anime_details">
                <p>Rating: <span>${anime.rating}</span></p>
                <p>Duration: <span>${anime.duration}</span></p>
                <p>Episodes: <span>${anime.episodes}</span></p>
                <p>Status: <span>${anime.status}</span></p>
                <p>Rype: <span>${anime.type}</span></p>
              </div>
              </div>
            </div>
            `
      );
    });
    removeAnime();
  }
  addanimeAside();
}

function addanimeAside(array) {
  const popover = document.getElementById("popover");
  const popoverText = document.getElementById("popoverText");

  popover.style.height = "fit-content";
  popover.style.width = "250px";
  popover.style.opacity = "1";
  popover.style.backgroundColor = "red";
  popoverText.style.color = "white";
  popoverText.innerText = "Anime has been removed";

  function returnPop() {
    popover.style.height = "0";
    popover.style.width = "0";
    popover.style.opacity = "0";
  }
  setTimeout(returnPop, 2000);

  const asideMain = document.getElementById("asideMain");
  asideMain.innerHTML = "";
  array.map((anime, index) => {
    asideMain.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="asideContent">
            <div class="asideImage">
              <img src="${anime.images.jpg.large_image_url}" />
            </div>
            <div class="asideInfo">
              <div class="anime_title">${anime.title}</div>
              <button id="${anime.title}">Remove From List</button>
              <details>
                <summary>Details</summary>
                <p>Rating: <span>${anime.rating}</span></p>
                <p>Duration: <span>${anime.duration}</span></p>
                <p>Episodes: <span>${anime.episodes}</span></p>
                <p>Status: <span>${anime.status}</span></p>
                <p>Type: <span>${anime.type}</span></p>
              </details>
               <div class="pc_version_anime_details">
                <p>Rating: <span>${anime.rating}</span></p>
                <p>Duration: <span>${anime.duration}</span></p>
                <p>Episodes: <span>${anime.episodes}</span></p>
                <p>Status: <span>${anime.status}</span></p>
                <p>Type: <span>${anime.type}</span></p>
            </div>
            </div>
          </div>
          `
    );
  });
  removeAnime();
}
