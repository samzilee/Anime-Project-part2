export const allSideShow = () => {
  let slideImages = [];
  let animeNames = [
    "naruto",
    "hXh",
    "dragon ball",
    "demon slayer",
    "one punch man",
  ];

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
      if (index <= animeNames.length - 1) {
        if (index === animeNames.length - 1) {
          return (nav_content.innerHTML = `<img src="${
            slideImages[animeNames.length - 1]
          }"/>`);
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
