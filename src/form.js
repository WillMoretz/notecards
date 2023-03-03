import { subjectStorage, tagStorage } from "./notecards";

const formValidator = (() => {
  const subjectFormID = "subject-form";
  const notecardFormID = "notecard-form";

  function validateSubjectForm() {
    const subjectInput = document.querySelector("#subject");
    const subjectInputErrorMessage = document.querySelector(
      ".subject-input-error"
    );

    if (subjectInput.value.length > 14) {
      subjectInputErrorMessage.textContent =
        "Input must be less than 14 characters";
      return false;
    }

    if (subjectInput.value.length === 0) {
      subjectInputErrorMessage.textContent = "Please enter a subject";
      return false;
    }

    subjectStorage.addSubject(subjectInput.value);
    return true;
  }

  function validateNotecardForm() {
    console.log("notecard form validation function ran");
  }

  return {
    validateSubjectForm,
    validateNotecardForm,
    subjectFormID,
    notecardFormID,
  };
})();

const formDOM = (() => {
  function generateOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("pop-up-overlay");
    overlay.classList.add("pop-up-overlay-active"); // change to inactive by default

    return overlay;
  }

  function toggleDisplay(popUp) {
    const overlay = document.querySelector(".pop-up-overlay");
    if (popUp.classList.contains("pop-up-active")) {
      popUp.classList.remove("pop-up-active");
      popUp.classList.add("pop-up-inactive");
      overlay.classList.remove("pop-up-overlay-active");
      overlay.classList.add("pop-up-overlay-inactive");
    } else {
      popUp.classList.remove("pop-up-inactive");
      popUp.classList.add("pop-up-active");
      overlay.classList.remove("pop-up-overlay-inactive");
      overlay.classList.add("pop-up-overlay-active");
    }
  }

  function generateCloseButton(form) {
    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.classList.add("pop-up-close");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      toggleDisplay(form);
    });

    return closeButton;
  }

  function generateTagInput() {
    const container = document.createElement("div");
    container.classList.add("tag-input");

    const tagInput = document.createElement("input");
    tagInput.setAttribute("type", "text");
    tagInput.setAttribute("id", "notecard-input-tag");
    tagInput.setAttribute("name", "notecard-input-tag");
    tagInput.setAttribute("list", "tag-list");
    container.appendChild(tagInput);

    const tagDatalist = document.createElement("datalist");
    tagDatalist.setAttribute("id", "tag-list");
    tagStorage.getTags().forEach((tag) => {
      console.log(tag);
      const option = document.createElement("option");
      option.setAttribute("value", tag);
      tagDatalist.appendChild(option);
    });
    container.appendChild(tagDatalist);

    const removeTagInput = document.createElement("button");
    removeTagInput.classList.add("remove-tag");
    removeTagInput.setAttribute("type", "button");
    removeTagInput.textContent = "X";
    removeTagInput.addEventListener("click", () => {
      container.remove();
    });
    container.appendChild(removeTagInput);

    return container;
  }

  function generateSubmitButton() {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";
    return submitButton;
  }

  function generateNotecardForm() {
    const form = document.createElement("form");
    form.classList.add("pop-up");
    form.classList.add("pop-up-active"); // change to inactive by default
    form.setAttribute("id", formValidator.notecardFormID);

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");

    const formItem1 = document.createElement("div");
    formItem1.classList.add("form-item");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";
    formItem1.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    formItem1.appendChild(titleInput);

    const titleInputErrorMessage = document.createElement("div");
    titleInputErrorMessage.classList.add("input-error");
    titleInputErrorMessage.classList.add("title-input-error");
    titleInputErrorMessage.textContent = "";
    formItem1.appendChild(titleInputErrorMessage);
    formRow1.appendChild(formItem1);
    form.appendChild(formRow1);

    const formRow2 = document.createElement("div");
    formRow2.classList.add("form-row");

    const formItem2 = document.createElement("div");
    formItem2.classList.add("form-item");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description";
    formItem2.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("id", "description");
    descriptionInput.setAttribute("name", "description");
    formItem2.appendChild(descriptionInput);

    const DescriptionInputErrorMessage = document.createElement("div");
    DescriptionInputErrorMessage.classList.add("input-error");
    DescriptionInputErrorMessage.classList.add("description-input-error");
    DescriptionInputErrorMessage.textContent = "";
    formItem2.appendChild(DescriptionInputErrorMessage);
    formRow2.appendChild(formItem2);
    form.appendChild(formRow2);

    const formRow3 = document.createElement("div");
    formRow3.classList.add("form-row");

    const formItem3 = document.createElement("div");
    formItem3.classList.add("form-item");

    const notecardSubjectLabel = document.createElement("label");
    notecardSubjectLabel.setAttribute("for", "notecard-input-subject");
    notecardSubjectLabel.textContent = "Subject";
    formItem3.appendChild(notecardSubjectLabel);

    const notecardSubjectInput = document.createElement("select");
    notecardSubjectInput.setAttribute("id", "notecard-input-subject");
    notecardSubjectInput.setAttribute("name", "notecard-input-subject");
    subjectStorage.getSubjects().forEach((subject) => {
      const option = document.createElement("option");
      option.setAttribute("value", subject);
      option.textContent = subject;
      notecardSubjectInput.appendChild(option);
    });
    formItem3.appendChild(notecardSubjectInput);
    formRow3.appendChild(formItem3);
    form.appendChild(formRow3);

    const formRow4 = document.createElement("div");
    formRow4.classList.add("form-row");

    const formItem4 = document.createElement("div");
    formItem4.classList.add("form-item");

    const tagLabel = document.createElement("label");
    tagLabel.setAttribute("for", "notecard-input-tag");
    tagLabel.textContent = "Tags";
    formItem4.appendChild(tagLabel);

    const addTagInput = document.createElement("button");
    addTagInput.classList.add("add-tag");
    addTagInput.setAttribute("type", "button");
    addTagInput.textContent = "+";
    addTagInput.addEventListener("click", () => {
      formItem4.insertBefore(generateTagInput(), addTagInput);
    });
    formItem4.appendChild(addTagInput);
    formRow4.appendChild(formItem4);
    form.appendChild(formRow4);

    const formRow5 = document.createElement("div");
    formRow5.classList.add("form-row");

    formRow5.appendChild(generateSubmitButton());
    form.appendChild(formRow5);

    form.appendChild(generateCloseButton(form));

    return form;
  }

  function generateSubjectForm() {
    const form = document.createElement("form");
    form.classList.add("pop-up");
    form.classList.add("pop-up-active"); // change to inactive by default
    form.setAttribute("id", formValidator.subjectFormID);

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");

    const formItem = document.createElement("div");
    formItem.classList.add("form-item");

    const subjectLabel = document.createElement("label");
    subjectLabel.setAttribute("for", "subject");
    subjectLabel.textContent = "New Subject";
    formItem.appendChild(subjectLabel);

    const subjectInput = document.createElement("input");
    subjectInput.setAttribute("type", "text");
    subjectInput.setAttribute("id", "subject");
    subjectInput.setAttribute("name", "subject");
    formItem.appendChild(subjectInput);

    const subjectInputErrorMessage = document.createElement("div");
    subjectInputErrorMessage.classList.add("input-error");
    subjectInputErrorMessage.classList.add("subject-input-error");
    subjectInputErrorMessage.textContent = "";
    formItem.appendChild(subjectInputErrorMessage);
    formRow1.appendChild(formItem);
    form.appendChild(formRow1);

    const formRow2 = document.createElement("div");
    formRow2.classList.add("form-row");

    formRow2.appendChild(generateSubmitButton());
    form.appendChild(formRow2);

    form.appendChild(generateCloseButton(form));

    return form;
  }

  return {
    generateNotecardForm,
    generateSubjectForm,
    generateOverlay,
    toggleDisplay,
  };
})();

export { formDOM, formValidator };
