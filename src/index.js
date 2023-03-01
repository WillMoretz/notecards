// notecardStorage Module Pattern
// will store notecards in an array. Will add and delete notecards
const notecardStorage = (() => {
  const notecards = [];

  function addNotecard(notecard) {
    notecards.push(notecard);
  }

  function removeNotecard(notecard) {
    const index = notecards.indexOf(notecard);
    notecards.splice(index, 1);
  }

  function getAllNotecards() {
    return notecards;
  }

  // returns an array of items that have all matching tags
  function getNotecardByTags(tags) {
    if (tags.length === 0) return getAllNotecards();
    return notecards.filter((notecard) => {
      for (const tag of tags) {
        if (notecard.tags.includes(tag)) return true;
      }
      return false;
    });
  }

  // returns an array of items that have a matching project
  function getNotecardBySubject(subject) {
    return notecards.filter((notecard) => notecard.subject === subject);
  }

  return {
    addNotecard,
    removeNotecard,
    getNotecardByTags,
    getNotecardBySubject,
    getAllNotecards,
  };
})();

// notecard factory function
// returns a new notecard
const notecard = (title, tags, content, subject) => {
  function addTag(newTag) {
    tags.push(newTag);
  }
  function removeTag(tag) {
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
  }

  return { title, tags, content, subject, addTag, removeTag };
};

// localstorage (probably should be its own module)
// function that stores a notecard object and a function that returns a notecard object out of storage

// subjectStorage Module Pattern
// will store subjects. Will add and delete subjects
const subjectStorage = (() => {
  const subjects = [];

  function addSubject(subject) {
    subjects.push(subject);
  }

  function removeSubject(subject) {
    const index = subjects.indexOf(subject);
    subjects.splice(index, 1);
  }

  function getSubjects() {
    return subjects;
  }

  return { addSubject, removeSubject, getSubjects };
})();

// tagStorage Module Pattern
// will store tags. Will add and delete tags
const tagStorage = (() => {
  const tags = [];

  function addTag(tag) {
    tags.push(tag);
  }

  function removeTag(tag) {
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
  }

  function getTags() {
    return tags;
  }

  return { addTag, removeTag, getTags };
})();

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
    const content = document.querySelector("#content");
    content.textContent = "";

    const homePage = document.createElement("div");
    homePage.classList.add("homepage");
    homePage.appendChild(generateHeader());
    homePage.appendChild(generateTags(tagList));
    homePage.appendChild(generateSidebar(subjectList));
    homePage.appendChild(generateBody(notecardList));
    homePage.appendChild(generateFooter());
    content.appendChild(homePage);
  }

  return { generateHomePage };
})();

// pageManager module pattern
// will call DOM functions and functions defined above
const pageManager = (() => {
  function InitHomepage() {
    // retrieve any saved notecards from local storage
    // store retrieved content

    // Dummy Content
    subjectStorage.addSubject("english");
    subjectStorage.addSubject("math");
    subjectStorage.addSubject("science");
    subjectStorage.addSubject("geography");
    subjectStorage.addSubject("history");
    tagStorage.addTag("tag1");
    tagStorage.addTag("tag2");
    tagStorage.addTag("tag3");
    notecardStorage.addNotecard(
      notecard(
        "title1",
        ["tag1", "tag2", "tag3"],
        "lorem ipsum blah blah blah",
        "english"
      )
    );
    notecardStorage.addNotecard(
      notecard(
        "title2",
        ["tag1", "tag2"],
        "lorem ipsum blah blah blaaaaaaah",
        "math"
      )
    );
    notecardStorage.addNotecard(
      notecard(
        "title3",
        ["tag1", "tag2"],
        "lorem ipsum blah blah blah",
        "science"
      )
    );
    notecardStorage.addNotecard(
      notecard(
        "title4",
        ["tag3", "tag4"],
        "lorem ipsum blah blah blah",
        "science"
      )
    );
    notecardStorage.addNotecard(
      notecard(
        "title5",
        ["tag2", "tag3"],
        "lorem ipsum blah blah blah",
        "history"
      )
    );

    homepage.generateHomePage(
      subjectStorage.getSubjects(),
      tagStorage.getTags(),
      notecardStorage.getAllNotecards()
    );
  }

  return {
    InitHomepage,
  };
})();

pageManager.InitHomepage();

// Event Listeners that will interface with pageManager
