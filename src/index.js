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

  function getNotecardByTags(tags) {
    console.log(tags);
  }

  function getNotecardByProject(project) {
    console.log(project);
  }

  return {
    addNotecard,
    removeNotecard,
    getNotecardByTags,
    getNotecardByProject,
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

// subject factory function
// returns a new subject
// will have a function the returns all notecards classified under the subject

// tagStorage Module Pattern
// will store tags. Will add and delete tags
// will have a function that returns all notecards that have the supplied tags

// DOMstuff: will be in its own module

// pageManager module pattern
// will call DOM functions and functions defined above

// Event Listeners that will interface with pageManager
