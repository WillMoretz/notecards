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

  // returns an array of items that have all matching tags
  function getNotecardByTags(tags) {
    return notecards.filter(
      (notecard) => notecard.tags.sort().join(",") === tags.sort().join(",")
    );
  }

  // returns an array of items that have a matching project
  function getNotecardBySubject(subject) {
    return notecards.filter((notecard) => notecard.subject === subject);
  }

  function getAllNotecards() {
    return notecards;
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
      const notecards = document.querySelectorAll(".notecard-inner");
      let allFront = true;

      for (const card of notecards) {
        if (card.classList.contains("rotated")) {
          allFront = false;
          break;
        }
      }

      if (allFront) {
        for (const card of notecards) flipper.flipToBack(card.classList);
      } else {
        for (const card of notecards) flipper.flipToFront(card.classList);
      }
    });

    nav.appendChild(flipAllButton);

    header.appendChild(nav);
    return header;
  }

  function generateBody(notecardList) {
    const body = document.createElement("div");
    body.classList.add("body");

    for (const card of notecardList) {
      // const cardArray = card.toArray();
      const notecardContainer = document.createElement("button");
      notecardContainer.classList.add("notecard");

      const notecardInner = document.createElement("div");
      notecardInner.classList.add("notecard-inner");

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = card.title;
      notecardInner.appendChild(title);

      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = card.content;
      notecardInner.appendChild(description);

      notecardInner.addEventListener("click", () => {
        flipper.flip(notecardInner.classList);
      });

      notecardContainer.appendChild(notecardInner);
      body.appendChild(notecardContainer);
    }

    return body;
  }

  function generateTags(tagList) {
    const tags = document.createElement("div");
    tags.classList.add("tags");

    for (const tag of tagList) {
      const button = document.createElement("button");
      button.textContent = tag;

      button.addEventListener("click", () => {});
      tags.appendChild(button);
    }

    return tags;
  }

  function generateSidebar(subjectList) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    for (const subject of subjectList) {
      const button = document.createElement("button");
      button.textContent = subject;

      button.addEventListener("click", () => {
        const notecardList = notecardStorage.getNotecardBySubject(subject);
        document
          .querySelector(".homepage")
          .replaceChild(
            generateBody(notecardList),
            document.querySelector(".body")
          );
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
  function displaySubjectCards(subject) {
    const currentNotecards = notecardStorage.getNotecardBySubject(subject);
    // Call DOM method to display currentNotecards
  }

  function displayTagsCards(tags) {
    const currentNotecards = notecardStorage.getNotecardByTags(tags);
    // Call DOM method to display currentNotecards
  }

  function displayAllCards() {
    const currentNotecards = notecardStorage.getAllNotecards();
    // Call DOM method to display currentNoteCards
  }

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
      notecard("title1", "", "lorem ipsum blah blah blah", "english")
    );
    notecardStorage.addNotecard(
      notecard("title2", "", "lorem ipsum blah blah blah", "math")
    );
    notecardStorage.addNotecard(
      notecard("title3", "", "lorem ipsum blah blah blah", "science")
    );
    notecardStorage.addNotecard(
      notecard("title4", "", "lorem ipsum blah blah blah", "science")
    );
    notecardStorage.addNotecard(
      notecard("title5", "", "lorem ipsum blah blah blah", "history")
    );

    homepage.generateHomePage(
      subjectStorage.getSubjects(),
      tagStorage.getTags(),
      notecardStorage.getAllNotecards()
    );
  }

  return {
    displaySubjectCards,
    displayTagsCards,
    displayAllCards,
    InitHomepage,
  };
})();

pageManager.InitHomepage();

// Event Listeners that will interface with pageManager
