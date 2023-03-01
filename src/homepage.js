import { notecardStorage, tagStorage } from "./notecards";

const notecardFilterer = (() => {
  function getSelectedSubject() {
    const selectedSubject = document.querySelector(".subject-selected");
    if (selectedSubject === null) return "none";
    return selectedSubject.textContent;
  }

  function getSelectedTags() {
    const selectedTags = document.querySelectorAll(".tag-selected");
    const selectedTagsTextContent = [];
    for (const selectedTag of selectedTags) {
      selectedTagsTextContent.push(selectedTag.textContent);
    }
    if (selectedTagsTextContent.length === 0) return "none";
    return selectedTagsTextContent;
  }

  function filter() {
    const selectedSubject = getSelectedSubject();
    const selectedTags = getSelectedTags();
    let notecards = [];

    if (selectedSubject === "none") {
      notecards = notecards.concat(notecardStorage.getAllNotecards());
    } else {
      notecards = notecards.concat(
        notecardStorage.getNotecardBySubject(selectedSubject)
      );
    }

    if (selectedTags !== "none") {
      notecards = notecards.filter((card) => {
        for (const tag of selectedTags) {
          if (!card.tags.includes(tag)) return false;
        }
        return true;
      });
    }
    return notecards;
  }

  return { filter };
})();

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

  function flipAll(notecards) {
    let allFront = true;

    for (const card of notecards) {
      if (card.classList.contains("rotated")) {
        allFront = false;
        break;
      }
    }

    if (allFront) {
      for (const card of notecards) flipToBack(card.classList);
    } else {
      for (const card of notecards) flipToFront(card.classList);
    }
  }

  return { flip, flipAll };
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
      flipper.flipAll(document.querySelectorAll(".notecard-inner"));
    });

    nav.appendChild(flipAllButton);

    header.appendChild(nav);
    return header;
  }

  function generateBody(notecardList) {
    const body = document.createElement("div");
    body.classList.add("body");

    for (const card of notecardList) {
      const notecardContainer = document.createElement("button");
      notecardContainer.classList.add("notecard");

      const notecardInner = document.createElement("div");
      notecardInner.classList.add("notecard-inner");

      const notecardFront = document.createElement("div");
      notecardFront.classList.add("notecard-front");

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = card.title;
      notecardFront.appendChild(title);
      notecardInner.appendChild(notecardFront);

      const notecardBack = document.createElement("div");
      notecardBack.classList.add("notecard-back");

      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = card.content;
      notecardBack.appendChild(description);

      const tags = document.createElement("div");
      tags.classList.add("notecard-tags");
      tags.textContent = card.tags.join(" | ");
      notecardBack.appendChild(tags);
      notecardInner.appendChild(notecardBack);

      notecardInner.addEventListener("click", () => {
        flipper.flip(notecardInner.classList);
      });

      notecardContainer.appendChild(notecardInner);
      body.appendChild(notecardContainer);
    }

    return body;
  }

  function refreshBody() {
    document
      .querySelector(".homepage")
      .replaceChild(
        generateBody(notecardFilterer.filter()),
        document.querySelector(".body")
      );
  }

  function generateTags(tagList) {
    const tags = document.createElement("div");
    tags.classList.add("tags");

    for (const tag of tagList) {
      const button = document.createElement("button");
      button.textContent = tag;

      button.addEventListener("click", () => {
        if (button.classList.contains("tag-selected")) {
          button.classList.remove("tag-selected");
        } else button.classList.add("tag-selected");

        refreshBody();
      });

      tags.appendChild(button);
    }

    return tags;
  }

  function refreshTags(tagList) {
    if (tagList === "none") {
      document
        .querySelector(".homepage")
        .replaceChild(
          generateTags(tagStorage.getTags()),
          document.querySelector(".tags")
        );
    } else {
      document
        .querySelector(".homepage")
        .replaceChild(generateTags(tagList), document.querySelector(".tags"));
    }
  }

  function filterTagsBySubject(subject) {
    const notecards = notecardStorage.getNotecardBySubject(subject);
    const tagList = [];

    for (const card of notecards) {
      for (const tag of card.tags) {
        if (!tagList.includes(tag)) tagList.push(tag);
      }
    }

    return tagList;
  }

  function generateSidebar(subjectList) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const subjectsLabel = document.createElement("div");
    subjectsLabel.classList.add(".subjects-label");
    subjectsLabel.textContent = "Subjects";
    sidebar.appendChild(subjectsLabel);
    console.log(subjectsLabel);

    for (const subject of subjectList) {
      const button = document.createElement("button");
      button.textContent = subject;

      button.addEventListener("click", () => {
        if (button.classList.contains("subject-selected")) {
          button.classList.remove("subject-selected");
          refreshBody();
          refreshTags("none");
          return;
        }

        refreshTags(filterTagsBySubject(subject));

        for (const sub of sidebar.children) {
          sub.classList.remove("subject-selected");
        }
        button.classList.add("subject-selected");
        refreshBody();
      });
      sidebar.appendChild(button);
    }

    return sidebar;
  }

  function generateFooter() {
    const footer = document.createElement("div");
    footer.classList.add("footer");
    footer.textContent = "Made by: Will Moretz";
    return footer;
  }

  function generateHomePage(subjectList, tagList, notecardList) {
    const homePage = document.createElement("div");
    homePage.classList.add("homepage");
    homePage.appendChild(generateHeader());
    homePage.appendChild(generateTags(tagList));
    homePage.appendChild(generateSidebar(subjectList));
    homePage.appendChild(generateBody(notecardList));
    homePage.appendChild(generateFooter());
    return homePage;
  }

  return { generateHomePage };
})();

export default homepage;
