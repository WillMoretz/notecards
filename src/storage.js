import {
  notecardStorage,
  subjectStorage,
  tagStorage,
  notecard,
} from "./notecards";

const storer = (() => {
  function storeNotecards() {}

  function storeSubjects() {}

  function storeTags() {}

  function store() {
    console.log("store function ran");
  }

  return { store };
})();

const restorer = (() => {
  function restoreNotecards() {}

  function restoreSubjects() {}

  function restoreTags() {}

  function restore() {
    console.log("restore function ran");
  }

  return { restore };
})();

export { storer, restorer };
