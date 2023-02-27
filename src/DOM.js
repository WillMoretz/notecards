/* eslint-disable prefer-destructuring */
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
  function generateHeader(eventFunction) {
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
      eventFunction();
    });
    nav.appendChild(flipAllButton);

    header.appendChild(nav);
    return header;
  }

  function generateTags(tagList, eventFunction) {
    const tags = document.createElement("div");
    tags.classList.add("tags");
    for (const tag of tagList) {
      const button = document.createElement("button");
      button.textContent = tag;
      button.addEventListener("click", () => {
        eventFunction();
      });
      tags.appendChild(button);
    }

    return tags;
  }

  function generateSidebar(projectList, eventFunction) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    for (const project of projectList) {
      const button = document.createElement("button");
      button.textContent = project;
      button.addEventListener("click", () => {
        eventFunction();
      });
      sidebar.appendChild(button);
    }

    return sidebar;
  }

  function generateBody(notecardList, eventFunction) {
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
        eventFunction();
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

  function generateHomePage(
    subjectList,
    tagList,
    notecardList,
    headerEvent,
    tagsEvent,
    subjectEvent,
    bodyEvent
  ) {
    const content = document.querySelector("#content");
    content.textContent = "";

    const homePage = document.createElement("div");
    homePage.classList.add("homepage");
    homePage.appendChild(generateHeader(headerEvent));
    homePage.appendChild(generateTags(tagList, tagsEvent));
    homePage.appendChild(generateSidebar(subjectList, subjectEvent));
    homePage.appendChild(generateBody(notecardList, bodyEvent));
    homePage.appendChild(generateFooter());
    content.appendChild(homePage);
  }

  return { generateHomePage };
})();

export { flipper, homepage };
