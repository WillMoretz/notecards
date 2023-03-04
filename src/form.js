import {
  subjectStorage,
  tagStorage,
  notecardStorage,
  notecard,
} from "./notecards";

const formValidator = (() => {
  const subjectFormID = "subject-form";
  const notecardFormID = "notecard-form";
  const titleCharMaxLength = 15;
  const descriptionCharMaxLength = 350;
  const subjectCharMaxLength = 15;

  function validateSubjectLength() {
    const subjectInput = document.querySelector("#subject");
    return subjectInput.value.length > subjectCharMaxLength;
  }

  function validateSubjectInputted() {
    const subjectInput = document.querySelector("#subject");
    return subjectInput.value.length === 0;
  }

  function validateSubjectForm() {
    const subjectInput = document.querySelector("#subject");
    const subjectInputErrorMessage = document.querySelector(
      ".subject-input-error"
    );

    if (validateSubjectLength()) {
      subjectInputErrorMessage.textContent = `Input must be less than ${subjectCharMaxLength} characters`;
      return false;
    }

    if (validateSubjectInputted()) {
      subjectInputErrorMessage.textContent = "Please enter a subject";
      return false;
    }

    subjectStorage.addSubject(subjectInput.value);
    return true;
  }

  function validateTitleLength() {
    const titleInput = document.querySelector("#title");
    return titleInput.value.length > titleCharMaxLength;
  }

  function validateTitleInputted() {
    const titleInput = document.querySelector("#title");
    return titleInput.value.length === 0;
  }

  function validateNotecardTitle() {
    const titleInputErrorMessage = document.querySelector(".title-input-error");

    let titleValid = true;
    if (validateTitleLength()) {
      titleInputErrorMessage.textContent = `Input must be less than ${titleCharMaxLength} characters`;
      titleValid = false;
    }

    if (validateTitleInputted()) {
      titleInputErrorMessage.textContent = "Please enter a title";
      titleValid = false;
    }

    if (titleValid) {
      titleInputErrorMessage.textContent = "";
      return true;
    }
    return false;
  }

  function validateDescriptionLength() {
    const descriptionInput = document.querySelector("#description");
    return descriptionInput.value.length > descriptionCharMaxLength;
  }

  function validateDescriptionInputted() {
    const descriptionInput = document.querySelector("#description");
    return descriptionInput.value.length === 0;
  }

  function validateNotecardDescription() {
    const descriptionInputErrorMessage = document.querySelector(
      ".description-input-error"
    );

    let descriptionValid = true;
    if (validateDescriptionLength()) {
      descriptionInputErrorMessage.textContent = `Input must be less than ${descriptionCharMaxLength} characters`;
      descriptionValid = false;
    }

    if (validateDescriptionInputted()) {
      descriptionInputErrorMessage.textContent = "Please enter a description";
      descriptionValid = false;
    }

    if (descriptionValid) {
      descriptionInputErrorMessage.textContent = "";
      return true;
    }
    return false;
  }

  function validateNotecardForm() {
    const subjectInput = document.querySelector("#notecard-input-subject");
    const tagsInput = document.querySelectorAll(".tag-input");
    const tagInputErrorMessage = document.querySelector(".tag-input-error");

    const tagsValues = [];
    tagsInput.forEach((tag) => {
      if (!tagsValues.includes(tag.value)) {
        tagsValues.push(tag.value);
      }
    });

    let valid = true;
    if (!validateNotecardTitle()) valid = false;
    if (!validateNotecardDescription()) valid = false;

    let tagValid = true;
    tagsValues.forEach((value) => {
      if (value.length > 15) {
        tagInputErrorMessage.textContent =
          "All tags must be less than 15 characters";
        tagValid = false;
      }
      if (value.length === 0) {
        tagInputErrorMessage.textContent = "Please enter a value for all tags";
        tagValid = false;
      }
    });
    if (!tagValid) valid = false;

    if (!valid) return false;

    tagInputErrorMessage.textContent = "";

    tagsValues.forEach((value) => {
      if (!tagStorage.getTags().includes(value)) {
        tagStorage.addTag(value);
      }
    });

    notecardStorage.addNotecard(
      notecard(
        document.querySelector("#title").value,
        tagsValues,
        document.querySelector("#description").value,
        subjectInput.value
      )
    );

    return true;
  }

  return {
    validateSubjectForm,
    validateNotecardForm,
    validateNotecardDescription,
    validateNotecardTitle,
    validateSubjectLength,
    validateSubjectInputted,
    validateTitleLength,
    validateTitleInputted,
    validateDescriptionLength,
    validateDescriptionInputted,
    descriptionCharMaxLength,
    titleCharMaxLength,
    subjectCharMaxLength,
    subjectFormID,
    notecardFormID,
  };
})();

const formDOM = (() => {
  function generateOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("pop-up-overlay");

    return overlay;
  }

  function removeForm(popUp) {
    popUp.remove();
    document.querySelector(".pop-up-overlay").remove();
  }

  function generateCloseButton(form) {
    const closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.classList.add("pop-up-close");
    closeButton.textContent = "X";
    closeButton.addEventListener("click", () => {
      removeForm(form);
    });

    return closeButton;
  }

  function generateTagInput() {
    const container = document.createElement("div");
    container.classList.add("tag-input-container");

    const tagInput = document.createElement("input");
    tagInput.classList.add("tag-input");
    tagInput.setAttribute("type", "text");
    tagInput.setAttribute("id", "notecard-input-tag");
    tagInput.setAttribute("name", "notecard-input-tag");
    tagInput.setAttribute("list", "tag-list");
    container.appendChild(tagInput);

    const tagDatalist = document.createElement("datalist");
    tagDatalist.setAttribute("id", "tag-list");
    tagStorage.getTags().forEach((tag) => {
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
    form.setAttribute("id", formValidator.notecardFormID);

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");

    const formItem1 = document.createElement("div");
    formItem1.classList.add("form-item");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title";
    formItem1.appendChild(titleLabel);

    const titleInputErrorMessage = document.createElement("div");
    titleInputErrorMessage.classList.add("input-error");
    titleInputErrorMessage.classList.add("title-input-error");
    titleInputErrorMessage.textContent = "";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("name", "title");
    titleInput.addEventListener("focusout", () => {
      if (formValidator.validateNotecardTitle()) {
        titleInput.classList.add("input-valid");
        titleInput.classList.remove("input-invalid");
        titleInputErrorMessage.textContent = "✓";
      } else {
        titleInput.classList.add("input-invalid");
        titleInput.classList.remove("input-valid");
      }
    });
    titleInput.addEventListener("keyup", () => {
      titleInputErrorMessage.textContent = `${titleInput.value.length}/${formValidator.titleCharMaxLength}`;
      if (
        !formValidator.validateTitleLength() &&
        !formValidator.validateTitleInputted()
      ) {
        titleInputErrorMessage.classList.add("error-valid");
        titleInputErrorMessage.classList.remove("error-invalid");
      } else {
        titleInputErrorMessage.classList.add("error-invalid");
        titleInputErrorMessage.classList.remove("error-valid");
      }
    });
    formItem1.appendChild(titleInput);
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

    const descriptionInputErrorMessage = document.createElement("div");
    descriptionInputErrorMessage.classList.add("input-error");
    descriptionInputErrorMessage.classList.add("description-input-error");
    descriptionInputErrorMessage.textContent = "";

    const descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("id", "description");
    descriptionInput.setAttribute("name", "description");
    descriptionInput.addEventListener("focusout", () => {
      if (formValidator.validateNotecardDescription()) {
        descriptionInput.classList.add("input-valid");
        descriptionInput.classList.remove("input-invalid");
        descriptionInputErrorMessage.textContent = "✓";
      } else {
        descriptionInput.classList.add("input-invalid");
        descriptionInput.classList.remove("input-valid");
      }
    });
    descriptionInput.addEventListener("keyup", () => {
      descriptionInputErrorMessage.textContent = `${descriptionInput.value.length}/${formValidator.descriptionCharMaxLength}`;
      if (
        !formValidator.validateDescriptionLength() &&
        !formValidator.validateDescriptionInputted()
      ) {
        descriptionInputErrorMessage.classList.add("error-valid");
        descriptionInputErrorMessage.classList.remove("error-invalid");
      } else {
        descriptionInputErrorMessage.classList.add("error-invalid");
        descriptionInputErrorMessage.classList.remove("error-valid");
      }
    });
    formItem2.appendChild(descriptionInput);
    formItem2.appendChild(descriptionInputErrorMessage);
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
      if (document.querySelectorAll(".tag-input-container").length > 5) return;
      formItem4.insertBefore(generateTagInput(), addTagInput);
    });
    formItem4.appendChild(addTagInput);

    const tagInputErrorMessage = document.createElement("div");
    tagInputErrorMessage.classList.add("input-error");
    tagInputErrorMessage.classList.add("tag-input-error");
    tagInputErrorMessage.textContent = "";
    formItem4.appendChild(tagInputErrorMessage);
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
    form.setAttribute("id", formValidator.subjectFormID);

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");

    const formItem = document.createElement("div");
    formItem.classList.add("form-item");

    const subjectLabel = document.createElement("label");
    subjectLabel.setAttribute("for", "subject");
    subjectLabel.textContent = "New Subject";
    formItem.appendChild(subjectLabel);

    const subjectInputErrorMessage = document.createElement("div");
    subjectInputErrorMessage.classList.add("input-error");
    subjectInputErrorMessage.classList.add("subject-input-error");
    subjectInputErrorMessage.textContent = "";

    const subjectInput = document.createElement("input");
    subjectInput.setAttribute("type", "text");
    subjectInput.setAttribute("id", "subject");
    subjectInput.setAttribute("name", "subject");
    subjectInput.addEventListener("focusout", () => {
      console.log(!formValidator.validateSubjectLength());
      console.log(!formValidator.validateSubjectInputted());
      if (
        !formValidator.validateSubjectLength() &&
        !formValidator.validateSubjectInputted()
      ) {
        subjectInput.classList.add("input-valid");
        subjectInput.classList.remove("input-invalid");
        subjectInputErrorMessage.textContent = "✓";
      } else {
        subjectInput.classList.add("input-invalid");
        subjectInput.classList.remove("input-valid");
      }
    });
    subjectInput.addEventListener("keyup", () => {
      subjectInputErrorMessage.textContent = `${subjectInput.value.length}/${formValidator.subjectCharMaxLength}`;
      if (
        subjectInput.value.length <= formValidator.subjectCharMaxLength &&
        subjectInput.value.length !== 0
      ) {
        subjectInputErrorMessage.classList.add("error-valid");
        subjectInputErrorMessage.classList.remove("error-invalid");
      } else {
        subjectInputErrorMessage.classList.add("error-invalid");
        subjectInputErrorMessage.classList.remove("error-valid");
      }
    });
    formItem.appendChild(subjectInput);
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
    removeForm,
  };
})();

export { formDOM, formValidator };
