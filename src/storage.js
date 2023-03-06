const storer = (() => {
  function storeNotecards(notecardList) {
    for (let i = 0; i < notecardList.length; i += 1) {
      const card = JSON.stringify(notecardList[i]);
      localStorage.setItem(`notecard${i}`, card);
    }
  }

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

  function store(tagList, subjectList, notecardList) {
    const visitStatus = localStorage.getItem("firstVisit");
    localStorage.clear();
    localStorage.setItem("firstVisit", visitStatus);
    storeTags(tagList);
    storeSubjects(subjectList);
    storeNotecards(notecardList);
  }

  return { store };
})();

const restorer = (() => {
  function restoreNotecards() {
    const notecardList = [];
    let i = 0;
    while (true) {
      const item = localStorage.getItem(`notecard${i}`);
      if (item !== null) {
        notecardList.push(JSON.parse(item));
        i += 1;
      } else break;
    }
    return notecardList;
  }

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
    const tagList = restoreTags();
    const subjectList = restoreSubjects();
    const notecardList = restoreNotecards();
    return { tagList, subjectList, notecardList };
  }

  return { restore };
})();

export { storer, restorer };
