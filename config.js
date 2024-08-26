const sideMenu = document.getElementById("menu");
const sideBar = document.getElementById("sideBar");
const cancelSideBar = document.getElementById("cancelSideBar");
const allContent = document.getElementById("all_content");

let sideBarWidth = "";
const showSideBar = () => {
  sideBar.style.width = "70%";
  sideBarWidth = sideBar.style.width;

  setTimeout(() => {
    if (sideBarWidth === "70%") {
      allContent.addEventListener("click", cancleBar, { once: true });
    }
  }, 100);
};

const cancleBar = () => {
  sideBar.style.width = "0";
  return (sideBarWidth = "0");
};

sideMenu.addEventListener("click", showSideBar);
cancelSideBar.addEventListener("click", cancleBar);

import { allSideShow } from "./imageSlide.js";
allSideShow();

import { main } from "./main.js";
main();
