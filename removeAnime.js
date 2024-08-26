import { addanimeAside } from "./main.js";
export function removeAnime() {
  const asideMain = document.getElementById("asideMain");
  const savedAnime = [];
  const animeSavedIds = [];
  let btns = [];
  let newSavedAnime = JSON.parse(localStorage.getItem("savedAnime")) || [];
  let newAnimeSavedIds = JSON.parse(localStorage.getItem("ids")) || [];

  if (JSON.parse(localStorage.getItem("savedAnime"))) {
    savedAnime.push(...JSON.parse(localStorage.getItem("savedAnime")));
    animeSavedIds.push(...JSON.parse(localStorage.getItem("ids")));
  }

  newSavedAnime.map((value, index) => {
    btns.push(document.getElementById(`${value.title}`));
  });

  if (btns) {
    btns.map((btn, index) => {
      btn.addEventListener("click", () => remove(index));
    });
  }
  function remove(id) {
    asideMain.innerHTML = "";

    newSavedAnime = savedAnime.filter((anime, index) => index !== id);

    localStorage.setItem("savedAnime", JSON.stringify(newSavedAnime)) || [];

    newAnimeSavedIds =
      animeSavedIds.filter((value, index) => index !== id) || [];

    localStorage.setItem("ids", JSON.stringify(newAnimeSavedIds));

    addanimeAside(newSavedAnime);
  }
}
