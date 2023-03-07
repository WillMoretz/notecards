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
const notecard = (title, tags, content, subject) => ({
  title,
  tags,
  content,
  subject,
});

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

  function removeUnusedTags() {
    const unusedTags = [];
    for (const tag of getTags()) unusedTags.push(tag);
    for (const card of notecardStorage.getAllNotecards()) {
      for (const tag of card.tags) {
        if (unusedTags.includes(tag)) {
          const tagIndex = unusedTags.indexOf(tag);
          unusedTags.splice(tagIndex, 1);
        }
      }
    }
    for (const tag of unusedTags) removeTag(tag);
  }

  return { addTag, removeTag, getTags, removeUnusedTags };
})();

export { notecardStorage, tagStorage, subjectStorage, notecard };
