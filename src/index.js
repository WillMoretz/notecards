// Pseudo code (some of these code blocks may later be moved to become their own modules)

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
  function getNotecardByProject(project) {
    return notecards.filter((notecard) => notecard.project === project);
  }

  function getAllNotecards() {
    return notecards;
  }

  return {
    addNotecard,
    removeNotecard,
    getNotecardByTags,
    getNotecardByProject,
    getAllNotecards,
  };
})();

// notecard factory function
// returns a new notecard
const notecard = (title, tags, content, project) => {
  function addTag(newTag) {
    tags.push(newTag);
  }
  function removeTag(tag) {
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
  }

  return { title, tags, content, project, addTag, removeTag };
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

// Event Listeners that will interface with pageManager
