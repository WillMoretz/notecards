// Pseudo code (some of these code blocks may later be moved to become their own modules)

// notecardStorage Module Pattern
// will store notecards in an array. Will add and delete notecards

// notecard factory function
// returns a new notecard
const notecard = (title, tags, content) => {
  function addTag(newTag) {
    tags.push(newTag);
  }
  function removeTag(tag) {
    const index = tags.indexOf(tag);
    tags.splice(index, 1);
  }

  return { title, tags, content, addTag, removeTag };
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
