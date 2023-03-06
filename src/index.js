import homepage from "./homepage";
import {
  subjectStorage,
  tagStorage,
  notecardStorage,
  notecard,
} from "./notecards";
import { formDOM, formValidator } from "./form";
import { storer, restorer } from "./storage";

// pageManager module pattern
// will call DOM functions and functions defined above
const pageManager = (() => {
  const PAGECONTAINER = document.querySelector("#content");

  function resetPage() {
    PAGECONTAINER.textContent = "";
  }

  function addDummyContent() {
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
  }

  function initHomepage() {
    console.log(localStorage);
    // retrieve any saved notecards from local storage
    const storedValues = restorer.restore();
    // add retrieved content
    for (const subject of storedValues.subjectList) {
      subjectStorage.addSubject(subject);
    }

    for (const tag of storedValues.tagList) {
      tagStorage.addTag(tag);
    }

    for (const card of storedValues.notecardList) {
      notecardStorage.addNotecard(card);
    }

    // Add dummy content if its the first visit
    if (localStorage.getItem("firstVisit") === null) {
      addDummyContent();
      localStorage.setItem("firstVisit", false);
    }
    // addDummyContent();

    resetPage();
    PAGECONTAINER.appendChild(
      homepage.generateHomePage(
        subjectStorage.getSubjects(),
        tagStorage.getTags(),
        notecardStorage.getAllNotecards()
      )
    );
  }

  return {
    initHomepage,
  };
})();

pageManager.initHomepage();

// Event Listeners that will interface with pageManager
document.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = document.querySelector(".pop-up");
  if (form.id === formValidator.subjectFormID) {
    if (formValidator.validateSubjectForm()) {
      homepage.refreshSidebar(subjectStorage.getSubjects());
      formDOM.removeForm(form);
      storer.store();
    }
  } else if (form.id === formValidator.notecardFormID) {
    if (formValidator.validateNotecardForm()) {
      homepage.refreshBody(notecardStorage.getAllNotecards());
      homepage.refreshTags(tagStorage.getTags());
      formDOM.removeForm(form);
      storer.store();
    }
  }
});
