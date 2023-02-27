/* eslint-disable no-restricted-syntax */
const flipper = (() => {
  function flipToFront(cardClasslist) {
    cardClasslist.remove("rotated");
  }

  function flipToBack(cardClasslist) {
    cardClasslist.remove("rotated");
    cardClasslist.add("rotated");
  }

  function flip(cardClasslist) {
    if (!cardClasslist.contains("rotated")) {
      flipToBack(cardClasslist);
    } else {
      flipToFront(cardClasslist);
    }
  }

  return { flipToFront, flipToBack, flip };
})();

const homepage = (() => {
  function generateHeader() {
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("h1");
    headerTitle.textContent = "Notecards!";
    header.appendChild(headerTitle);

    const nav = document.createElement("div");
    nav.classList.add("nav");

    const flipAllButton = document.createElement("button");
    flipAllButton.textContent = "Flip All";
    flipAllButton.addEventListener("click", () => {
      console.log("flip all button fired");
    });
    nav.appendChild(flipAllButton);

    header.appendChild(nav);
    return header;
  }

  function generateTags(tagList) {
    const tags = document.createElement("div");
    tags.classList.add("tags");
    for (const tag of tagList) {
      const button = document.createElement("button");
      button.textContent = tag;
      button.addEventListener("click", () => {
        console.log(`${tag}'s button fired`);
      });
      tags.appendChild(button);
    }

    return tags;
  }

  function generateSidebar(projectList) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    for (const project of projectList) {
      const button = document.createElement("button");
      button.textContent = project;
      button.addEventListener("click", () => {
        console.log(`${project}'s button fired`);
      });
      sidebar.appendChild(button);
    }

    return sidebar;
  }

  function generateBody(notecardList) {
    const body = document.createElement("div");
    body.classList.add("body");
    for (const notecard of notecardList) {
      const notecardContainer = document.createElement("button");
      notecardContainer.classList.add("notecard");

      const notecardInner = document.createElement("div");
      notecardInner.classList.add("notecard-inner");

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = notecard[0];
      notecardInner.appendChild(title);

      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = notecard[1];
      notecardInner.appendChild(description);

      notecardInner.addEventListener("click", () => {
        console.log("notecard flip event fired");
      });

      notecardContainer.appendChild(notecardInner);
      body.appendChild(notecardContainer);
    }

    return body;
  }

  function generateFooter() {
    const footer = document.createElement("div");
    footer.classList.add("footer");
    footer.textContent = "Made by: Will Moretz";
    return footer;
  }

  // function generateHomePage(projectList, tagList, notecardList) {
  function generateHomePage() {
    const content = document.querySelector("#content");
    content.textContent = "";

    const homePage = document.createElement("div");
    homePage.classList.add("homepage");
    homePage.appendChild(generateHeader());
    homePage.appendChild(generateTags(["tag1", "tag2", "tag3"]));
    homePage.appendChild(
      generateSidebar([
        "english",
        "math",
        "science",
        "arts and crafts",
        "history",
      ])
    );
    homePage.appendChild(
      generateBody([
        [
          "title",
          `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
    sequi quasi natus? Aut, praesentium voluptates?`,
        ],
        [
          "title",
          `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
    sequi quasi natus? Aut, praesentium voluptates?`,
        ],
        [
          "title",
          `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
    sequi quasi natus? Aut, praesentium voluptates?`,
        ],
      ])
    );
    homePage.appendChild(generateFooter());
    content.appendChild(homePage);
  }

  return { generateHomePage };
})();

// eslint-disable-next-line import/prefer-default-export
export { flipper, homepage };
