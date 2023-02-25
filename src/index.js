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

// DOMstuff: will be in its own module

// pageManager module pattern
// will call DOM functions and functions defined above
const pageManager = (() => {
  function displaySubject(subject) {
    const currentNotecards = notecardStorage.getNotecardBySubject(subject);
    // Call DOM method to display currentNotecards
  }

  function displayTags(tags) {
    const currentNotecards = notecardStorage.getNotecardByTags(tags);
    // Call DOM method to display currentNotecards
  }

  function displayAll() {
    const currentNotecards = notecardStorage.getAllNotecards();
    // Call DOM method to display currentNoteCards
  }

  return { displaySubject, displayTags, displayAll };
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

// Event Listeners that will interface with pageManager
const CARDS = document.querySelectorAll(".notecard-inner");
CARDS.forEach((CARD) => {
  CARD.addEventListener("click", () => flipper.flip(CARD.classList));
});
