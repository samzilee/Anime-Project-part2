const sideMenu = document.getElementById("menu");
const sideBar = document.getElementById("sideBar");
const cancelSideBar = document.getElementById("cancelSideBar");
const allContent = document.getElementById("all_content");

const showSideBar = () => {
  sideBar.style.width = "70%";
  allContent.style.pointerEvents = "none";
};
const cancleBar = () => {
  sideBar.style.width = "0";
  allContent.style.pointerEvents = "";
};
sideMenu.addEventListener("click", showSideBar);
cancelSideBar.addEventListener("click", cancleBar);

import { allSideShow } from "./imageSlide.js";
allSideShow();

import { main } from "./main.js";
main();
