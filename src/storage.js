import {
  notecardStorage,
  subjectStorage,
  tagStorage,
  notecard,
} from "./notecards";

const storer = (() => {
  function storeNotecards() {}

  function storeSubjects(subjectList) {
    for (let i = 0; i < subjectList.length; i += 1) {
      localStorage.setItem(`subject${i}`, subjectList[i]);
    }
  }

  function storeTags(tagList) {
    for (let i = 0; i < tagList.length; i += 1) {
      localStorage.setItem(`tag${i}`, tagList[i]);
    }
  }

  function store(tagList, subjectList) {
    storeTags(tagList);
    storeSubjects(subjectList);
  }

  return { store };
})();

const restorer = (() => {
  function restoreNotecards() {}

  function restoreSubjects() {
    const subjectList = [];
    let i = 0;
    while (true) {
      const item = localStorage.getItem(`subject${i}`);
      if (item !== null) {
        subjectList.push(item);
        i += 1;
      } else break;
    }
    return subjectList;
  }

  function restoreTags() {
    const tagList = [];
    let i = 0;
    while (true) {
      const item = localStorage.getItem(`tag${i}`);
      if (item !== null) {
        tagList.push(item);
        i += 1;
      } else break;
    }
    return tagList;
  }

  function restore() {
    console.log("restore function ran");
  }

  return { restore };
})();

export { storer, restorer };
