import homepage from "./homepage";
import {
  subjectStorage,
  tagStorage,
  notecardStorage,
  notecard,
} from "./notecards";
import formDOM from "./form";

// pageManager module pattern
// will call DOM functions and functions defined above
const pageManager = (() => {
  const PAGECONTAINER = document.querySelector("#content");

  function resetPage() {
    PAGECONTAINER.textContent = "";
  }

  function initHomepage() {
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

    resetPage();
    PAGECONTAINER.appendChild(
      homepage.generateHomePage(
        subjectStorage.getSubjects(),
        tagStorage.getTags(),
        notecardStorage.getAllNotecards()
      )
    );
  }

  function initForm() {
    // resetPage();
    PAGECONTAINER.appendChild(formDOM.generateSubjectForm());
    PAGECONTAINER.appendChild(formDOM.generateOverlay());
  }

  return {
    initHomepage,
    initForm,
  };
})();

pageManager.initHomepage();
pageManager.initForm();

// Event Listeners that will interface with pageManager
