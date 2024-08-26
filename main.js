import { removeAnime } from "./removeAnime.js";
export { main, addanimeAside };
function main() {
  const search = document.getElementById("search");
  const btn = document.getElementById("searchBtn");
  const mainContainer = document.querySelector(".main_container");
  const all_content = document.getElementById("all_content");
  const popover = document.getElementById("popover");

  btn.addEventListener("click", mainFetch);
  all_content.addEventListener("keydown", keyy);

  let result = "";
  let IDedAnime = JSON.parse(localStorage.getItem("ids")) || [];

  let savedAnime = JSON.parse(localStorage.getItem("savedAnime")) || [];

  function keyy(event) {
    if (event.key === "Enter") {
      mainFetch();
    }
  }

  async function firstMain() {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=one punch man&sfw`
    );
    const data = await response.json();
    result = data.data;
    mainFetch();
    // console.log(result[0].mal_id);
  }
  firstMain();

  async function mainFetch() {
    mainContainer.innerHTML = "";
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search.value}&sfw`
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

      IDedAnime = JSON.parse(localStorage.getItem("ids"));
      savedAnime = JSON.parse(localStorage.getItem("savedAnime"));

      for (let i = 0; i <= IDedAnime.length - 1; i++) {
        if (IDedAnime[i] == id) {
          alert("Anime is already saved.");
          return;
        }
      }

      popover.style.height = "fit-content";
      popover.style.width = "300px";
      popover.style.opacity = "1";

      function returnPop() {
        popover.style.height = "0";
        popover.style.width = "0";
        popover.style.opacity = "0";
      }
      setTimeout(returnPop, 3000);

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
                  <p>rating: <span>${anime.rating}</span></p>
                  <p>duration: <span>${anime.duration}</span></p>
                  <p>Episodes: <span>${anime.episodes}</span></p>
                  <p>status: <span>${anime.status}</span></p>
                  <p>type: <span>${anime.type}</span></p>
                </details>
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
  const asideMain = document.getElementById("asideMain");
  asideMain.innerHTML = "";
  console.log(array);
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
                <p>rating: <span>${anime.rating}</span></p>
                <p>duration: <span>${anime.duration}</span></p>
                <p>Episodes: <span>${anime.episodes}</span></p>
                <p>status: <span>${anime.status}</span></p>
                <p>type: <span>${anime.type}</span></p>
              </details>
            </div>
          </div>
          `
    );
  });
  removeAnime();
}
