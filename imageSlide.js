export const allSideShow = () => {
  let slideImages = [
    // "images/cyberpunk_2077_phantom_liberty_katana-wallpaper-1920x1080.jpg",
    // "images/final_fantasy_vii_rebirth_2024_video_game-wallpaper-1920x1080.jpg",
    // "images/spider_man_14-wallpaper-1920x1080.jpg",
    // "images/god_of_war_ragnarok_game-wallpaper-1920x1080.jpg",
    // "images/rick_and_morty_car_rainbow-wallpaper-1920x1080.jpg",
  ];
  let animeNames = ["naruto", "bleach", "hXh", "dragon ball", "demon slayer"];

  let delay = 1000;
  animeNames.forEach((names) => {
    setTimeout(() => {
      getData(names);
    }, (delay += 1000));

    if (delay === 6000) {
      return (delay = 1000);
    }
  });

  async function getData(name) {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${name}&sfw`
    );
    const data = await response.json();
    slideImages.push(data.data[0].images.jpg.large_image_url);

    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const nav_content = document.getElementById("nav_contentJs");

    nav_content.innerHTML = `<img src="${slideImages[0]}"/>`;

    let index = 1;
    const right = () => {
      if (index <= 4) {
        if (index === 4) {
          return (nav_content.innerHTML = `<img src="${slideImages[4]}"/>`);
        }
        nav_content.innerHTML = `<img src="${slideImages[index++]}"/>`;
      } else {
        return;
      }
    };

    const left = () => {
      if (index >= 0) {
        if (index === 0) {
          return (nav_content.innerHTML = `<img src="${slideImages[0]}"/>`);
        }
        nav_content.innerHTML = `<img src="${slideImages[index--]}"/>`;
      } else {
        return (index = 0);
      }
    };

    leftBtn.addEventListener("click", left);
    rightBtn.addEventListener("click", right);
  }
};
