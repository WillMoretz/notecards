/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formDOM": () => (/* binding */ formDOM),
/* harmony export */   "formValidator": () => (/* binding */ formValidator)
/* harmony export */ });
/* harmony import */ var _notecards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notecards */ "./src/notecards.js");
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




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

  function validateSubjectDuplicates() {
    const subjectInput = document.querySelector("#subject");
    for (const subject of _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.getSubjects()) {
      if (subjectInput.value === subject) return true;
    }
    return false;
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

    if (validateSubjectDuplicates()) {
      subjectInputErrorMessage.textContent = "Subject already exists";
      return false;
    }

    _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.addSubject(subjectInput.value);
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
      if (!_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags().includes(value)) {
        _notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.addTag(value);
      }
    });

    _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_0__.notecard)(
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
    validateSubjectDuplicates,
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

  function generateTagInput(defaultTag) {
    const container = document.createElement("div");
    container.classList.add("tag-input-container");

    const tagInput = document.createElement("input");
    tagInput.classList.add("tag-input");
    tagInput.setAttribute("type", "text");
    tagInput.setAttribute("id", "notecard-input-tag");
    tagInput.setAttribute("name", "notecard-input-tag");
    tagInput.setAttribute("value", defaultTag);
    tagInput.setAttribute("list", "tag-list");
    container.appendChild(tagInput);

    const tagDatalist = document.createElement("datalist");
    tagDatalist.setAttribute("id", "tag-list");
    _notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags().forEach((tag) => {
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

  function generateConfirmSubjectDeleteForm(subject) {
    const form = document.createElement("div");
    form.classList.add("pop-up");

    const formRow1 = document.createElement("div");
    formRow1.classList.add("form-row");
    formRow1.classList.add("confirm-delete-warning-container");

    const confirmDeleteWarning = document.createElement("div");
    confirmDeleteWarning.textContent = `Are you sure you want to delete the subject "${subject}"? All notecards contained in the subject "${subject}" will not be deleted. The notecards in the subject "${subject}" will still be present in the everything subject`;

    formRow1.appendChild(confirmDeleteWarning);
    form.appendChild(formRow1);

    const formRow2 = document.createElement("div");
    formRow2.classList.add("form-row");

    const cancelDeleteButton = document.createElement("button");
    cancelDeleteButton.classList.add("cancel-delete-button");
    cancelDeleteButton.textContent = "Cancel";
    cancelDeleteButton.addEventListener("click", () => {
      removeForm(form);
    });
    formRow2.appendChild(cancelDeleteButton);

    const confirmDeleteButton = document.createElement("button");
    confirmDeleteButton.classList.add("confirm-delete-button");
    confirmDeleteButton.textContent = "Confirm";
    confirmDeleteButton.addEventListener("click", () => {
      for (const card of _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getNotecardBySubject(subject)) {
        card.subject = "everything";
      }
      _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.removeSubject(subject);
      _homepage__WEBPACK_IMPORTED_MODULE_1__["default"].refreshSidebar(_notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.getSubjects());
      _homepage__WEBPACK_IMPORTED_MODULE_1__["default"].refreshBody();
      _storage__WEBPACK_IMPORTED_MODULE_2__.storer.store();
      removeForm(form);
    });
    formRow2.appendChild(confirmDeleteButton);
    form.appendChild(formRow2);

    form.appendChild(generateCloseButton(form));

    return form;
  }

  function generateNotecardForm(defaultTitle, defaultDescription, defaultTags) {
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
    titleInput.setAttribute("value", defaultTitle);
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
    descriptionInput.textContent = defaultDescription;
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
    const defaultSubject = document.querySelector(".subject-selected");
    let defaultSubjectValue = "none";
    if (defaultSubject !== null)
      defaultSubjectValue = defaultSubject.textContent;
    _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.getSubjects().forEach((subject) => {
      if (subject !== "everything") {
        const option = document.createElement("option");
        option.setAttribute("value", subject);
        if (subject === defaultSubjectValue) {
          option.setAttribute("selected", "selected");
        }
        option.textContent = subject;
        notecardSubjectInput.appendChild(option);
      }
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
      formItem4.insertBefore(generateTagInput(""), addTagInput);
    });
    for (const tag of defaultTags) {
      formItem4.appendChild(generateTagInput(tag));
    }
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

  function generateSubjectForm(defaultValue) {
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
    subjectInput.setAttribute("value", defaultValue);
    subjectInput.addEventListener("focusout", () => {
      if (
        !formValidator.validateSubjectLength() &&
        !formValidator.validateSubjectInputted() &&
        !formValidator.validateSubjectDuplicates()
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
      if (!formValidator.validateSubjectDuplicates()) {
        subjectInputErrorMessage.textContent = `${subjectInput.value.length}/${formValidator.subjectCharMaxLength}`;
      } else {
        subjectInputErrorMessage.textContent = "Subject already exists";
      }
      if (
        !formValidator.validateSubjectLength() &&
        !formValidator.validateSubjectInputted() &&
        !formValidator.validateSubjectDuplicates()
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
    generateConfirmSubjectDeleteForm,
  };
})();




/***/ }),

/***/ "./src/homepage.js":
/*!*************************!*\
  !*** ./src/homepage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _notecards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notecards */ "./src/notecards.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form */ "./src/form.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");




const notecardFilterer = (() => {
  function getSelectedSubject() {
    const selectedSubject = document.querySelector(".subject-selected");
    if (selectedSubject === null) return "none";
    return selectedSubject.textContent;
  }

  function getSelectedTags() {
    const selectedTags = document.querySelectorAll(".tag-selected");
    const selectedTagsTextContent = [];
    for (const selectedTag of selectedTags) {
      selectedTagsTextContent.push(selectedTag.textContent);
    }
    if (selectedTagsTextContent.length === 0) return "none";
    return selectedTagsTextContent;
  }

  function filter() {
    const selectedSubject = getSelectedSubject();
    const selectedTags = getSelectedTags();
    let notecards = [];

    if (selectedSubject === "none") {
      notecards = notecards.concat(_notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getAllNotecards());
    } else if (selectedSubject === "everything") {
      notecards = notecards.concat(_notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getAllNotecards());
    } else {
      notecards = notecards.concat(
        _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getNotecardBySubject(selectedSubject)
      );
    }

    if (selectedTags !== "none") {
      notecards = notecards.filter((card) => {
        for (const tag of selectedTags) {
          if (!card.tags.includes(tag)) return false;
        }
        return true;
      });
    }
    return notecards;
  }

  return { filter };
})();

const flipper = (() => {
  function flipToFront(cardClasslist) {
    cardClasslist.remove("rotated");
  }

  function flipToBack(cardClasslist) {
    cardClasslist.remove("rotated");
    cardClasslist.add("rotated");
  }

  function flip(cardClasslist) {
    if (!cardClasslist.contains("rotated")) {
      flipToBack(cardClasslist);
    } else {
      flipToFront(cardClasslist);
    }
  }

  function flipAll(notecards) {
    let allFront = true;

    for (const card of notecards) {
      if (card.classList.contains("rotated")) {
        allFront = false;
        break;
      }
    }

    if (allFront) {
      for (const card of notecards) flipToBack(card.classList);
    } else {
      for (const card of notecards) flipToFront(card.classList);
    }
  }

  return { flip, flipAll };
})();

const homepage = (() => {
  function generateHeader() {
    const header = document.createElement("div");
    header.classList.add("header");

    const headerTitle = document.createElement("h1");
    headerTitle.textContent = "Notecards!";
    header.appendChild(headerTitle);

    const nav = document.createElement("div");
    nav.classList.add("nav");

    const addSubjectButton = document.createElement("button");
    addSubjectButton.textContent = "Add Subject";

    addSubjectButton.addEventListener("click", () => {
      const container = document.querySelector("#content");
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateSubjectForm(""));
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateOverlay());
    });

    nav.appendChild(addSubjectButton);

    const removeSubjectButton = document.createElement("button");
    removeSubjectButton.textContent = "Remove Subject";
    removeSubjectButton.classList.add("remove-subject-button");
    removeSubjectButton.style.display = "none";

    removeSubjectButton.addEventListener("click", () => {
      const container = document.querySelector("#content");
      container.appendChild(
        _form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateConfirmSubjectDeleteForm(
          document.querySelector(".subject-selected").textContent
        )
      );
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateOverlay());
    });

    nav.appendChild(removeSubjectButton);

    const editSubjectButton = document.createElement("button");
    editSubjectButton.textContent = "Edit Subject";
    editSubjectButton.classList.add("edit-subject-button");
    editSubjectButton.style.display = "none";

    editSubjectButton.addEventListener("click", () => {
      const currentSubject = document.querySelector(".subject-selected");
      const container = document.querySelector("#content");
      container.appendChild(
        _form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateSubjectForm(currentSubject.textContent)
      );
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateOverlay());
      currentSubject.remove();
      _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.removeSubject(currentSubject.textContent);
      // eslint-disable-next-line no-use-before-define
      refreshSidebar(_notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.getSubjects());
      _storage__WEBPACK_IMPORTED_MODULE_2__.storer.store();
    });

    nav.appendChild(editSubjectButton);

    const addNotecardButton = document.createElement("button");
    addNotecardButton.textContent = "Add Notecard";

    addNotecardButton.addEventListener("click", () => {
      const container = document.querySelector("#content");
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateNotecardForm("", "", []));
      container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateOverlay());
    });

    nav.appendChild(addNotecardButton);

    const flipAllButton = document.createElement("button");
    flipAllButton.textContent = "Flip All";

    flipAllButton.addEventListener("click", () => {
      flipper.flipAll(document.querySelectorAll(".notecard-inner"));
    });

    nav.appendChild(flipAllButton);

    header.appendChild(nav);
    return header;
  }

  function generateBody(notecardList) {
    const body = document.createElement("div");
    body.classList.add("body");

    for (const card of notecardList) {
      const notecardContainer = document.createElement("button");
      notecardContainer.classList.add("notecard");

      const notecardInner = document.createElement("div");
      notecardInner.classList.add("notecard-inner");

      const notecardFront = document.createElement("div");
      notecardFront.classList.add("notecard-front");

      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = card.title;
      notecardFront.appendChild(title);
      notecardInner.appendChild(notecardFront);

      const notecardBack = document.createElement("div");
      notecardBack.classList.add("notecard-back");

      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = card.content;
      notecardBack.appendChild(description);

      const notecardOptions = document.createElement("div");
      notecardOptions.classList.add("notecard-back-options");
      notecardOptions.style.display = "none";

      const tags = document.createElement("div");
      tags.classList.add("notecard-tags");
      tags.textContent = card.tags.join(", ");
      notecardOptions.appendChild(tags);

      const editNotecardButton = document.createElement("button");
      editNotecardButton.classList.add("edit-notecard-button");
      editNotecardButton.textContent = "Edit";
      editNotecardButton.addEventListener("click", (e) => {
        e.stopPropagation();
        const container = document.querySelector("#content");
        container.appendChild(
          _form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateNotecardForm(card.title, card.content, card.tags)
        );
        container.appendChild(_form__WEBPACK_IMPORTED_MODULE_1__.formDOM.generateOverlay());
        _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.removeNotecard(card);
        notecardContainer.remove();
        _notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.removeUnusedTags();
        // eslint-disable-next-line no-use-before-define
        refreshTags(_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags());
        _storage__WEBPACK_IMPORTED_MODULE_2__.storer.store();
      });
      notecardOptions.appendChild(editNotecardButton);

      const optionsButton = document.createElement("button");
      optionsButton.classList.add("notecard-back-button");
      optionsButton.textContent = "☰";
      optionsButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (optionsButton.textContent === "☰") {
          optionsButton.textContent = "X";
          description.style.display = "none";
          notecardOptions.style.display = "block";
        } else {
          optionsButton.textContent = "☰";
          description.style.display = "block";
          notecardOptions.style.display = "none";
        }
      });
      notecardBack.appendChild(optionsButton);

      const removeNotecardButton = document.createElement("button");
      removeNotecardButton.classList.add("remove-notecard-button");
      removeNotecardButton.textContent = "Remove";
      removeNotecardButton.addEventListener("click", (e) => {
        e.stopPropagation();
        _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.removeNotecard(card);
        notecardContainer.remove();
        _notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.removeUnusedTags();
        // eslint-disable-next-line no-use-before-define
        refreshTags(_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags());
        _storage__WEBPACK_IMPORTED_MODULE_2__.storer.store();
      });
      notecardOptions.appendChild(removeNotecardButton);

      notecardBack.appendChild(notecardOptions);
      notecardInner.appendChild(notecardBack);

      notecardInner.addEventListener("click", () => {
        flipper.flip(notecardInner.classList);
      });

      notecardContainer.appendChild(notecardInner);
      body.appendChild(notecardContainer);
    }

    return body;
  }

  function refreshBody() {
    document
      .querySelector(".homepage")
      .replaceChild(
        generateBody(notecardFilterer.filter()),
        document.querySelector(".body")
      );
  }

  function generateTags(tagList) {
    const tags = document.createElement("div");
    tags.classList.add("tags");

    for (const tag of tagList) {
      const button = document.createElement("button");
      button.textContent = tag;

      button.addEventListener("click", () => {
        if (button.classList.contains("tag-selected")) {
          button.classList.remove("tag-selected");
        } else button.classList.add("tag-selected");

        refreshBody();
      });

      tags.appendChild(button);
    }

    return tags;
  }

  function refreshTags(tagList) {
    if (tagList === "none") {
      document
        .querySelector(".homepage")
        .replaceChild(
          generateTags(_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags()),
          document.querySelector(".tags")
        );
    } else {
      document
        .querySelector(".homepage")
        .replaceChild(generateTags(tagList), document.querySelector(".tags"));
    }
  }

  function filterTagsBySubject(subject) {
    const notecards = _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getNotecardBySubject(subject);
    const tagList = [];

    for (const card of notecards) {
      for (const tag of card.tags) {
        if (!tagList.includes(tag)) tagList.push(tag);
      }
    }

    return tagList;
  }

  function generateSidebar(subjectList) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const subjectsLabel = document.createElement("div");
    subjectsLabel.classList.add(".subjects-label");
    subjectsLabel.textContent = "Subjects";
    sidebar.appendChild(subjectsLabel);

    for (const subject of subjectList) {
      const button = document.createElement("button");
      button.textContent = subject;
      if (subject === "everything") button.classList.add("subject-everything");

      button.addEventListener("click", () => {
        if (button.classList.contains("subject-selected")) {
          button.classList.remove("subject-selected");
          document
            .querySelector(".subject-everything")
            .classList.add("subject-selected");
          refreshBody();
          refreshTags(_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags());
          document.querySelector(".edit-subject-button").style.display = "none";
          document.querySelector(".remove-subject-button").style.display =
            "none";
          return;
        }

        if (subject === "everything") {
          refreshTags(_notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags());
          document.querySelector(".edit-subject-button").style.display = "none";
          document.querySelector(".remove-subject-button").style.display =
            "none";
        } else {
          refreshTags(filterTagsBySubject(subject));
          document.querySelector(".edit-subject-button").style.display =
            "block";
          document.querySelector(".remove-subject-button").style.display =
            "block";
        }

        for (const sub of sidebar.children) {
          sub.classList.remove("subject-selected");
        }
        button.classList.add("subject-selected");
        refreshBody();
      });
      sidebar.appendChild(button);
    }

    return sidebar;
  }

  function refreshSidebar(subjectList) {
    document
      .querySelector(".homepage")
      .replaceChild(
        generateSidebar(subjectList),
        document.querySelector(".sidebar")
      );
  }

  function generateFooter() {
    const footer = document.createElement("div");
    footer.classList.add("footer");
    footer.textContent = "Made by: Will Moretz";
    return footer;
  }

  function generateHomePage(subjectList, tagList, notecardList) {
    const homePage = document.createElement("div");
    homePage.classList.add("homepage");
    homePage.appendChild(generateHeader());
    homePage.appendChild(generateTags(tagList));
    homePage.appendChild(generateSidebar(subjectList));
    homePage.appendChild(generateBody(notecardList));
    homePage.appendChild(generateFooter());
    return homePage;
  }

  return { generateHomePage, refreshSidebar, refreshBody, refreshTags };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (homepage);


/***/ }),

/***/ "./src/notecards.js":
/*!**************************!*\
  !*** ./src/notecards.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notecard": () => (/* binding */ notecard),
/* harmony export */   "notecardStorage": () => (/* binding */ notecardStorage),
/* harmony export */   "subjectStorage": () => (/* binding */ subjectStorage),
/* harmony export */   "tagStorage": () => (/* binding */ tagStorage)
/* harmony export */ });
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




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "restorer": () => (/* binding */ restorer),
/* harmony export */   "storer": () => (/* binding */ storer)
/* harmony export */ });
/* harmony import */ var _notecards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notecards */ "./src/notecards.js");


const storer = (() => {
  function storeNotecards() {
    const notecardList = _notecards__WEBPACK_IMPORTED_MODULE_0__.notecardStorage.getAllNotecards();
    for (let i = 0; i < notecardList.length; i += 1) {
      const card = JSON.stringify(notecardList[i]);
      localStorage.setItem(`notecard${i}`, card);
    }
  }

  function storeSubjects() {
    const subjectList = _notecards__WEBPACK_IMPORTED_MODULE_0__.subjectStorage.getSubjects();
    for (let i = 0; i < subjectList.length; i += 1) {
      localStorage.setItem(`subject${i}`, subjectList[i]);
    }
  }

  function storeTags() {
    const tagList = _notecards__WEBPACK_IMPORTED_MODULE_0__.tagStorage.getTags();
    for (let i = 0; i < tagList.length; i += 1) {
      localStorage.setItem(`tag${i}`, tagList[i]);
    }
  }

  function store() {
    const visitStatus = localStorage.getItem("firstVisit");
    localStorage.clear();
    localStorage.setItem("firstVisit", visitStatus);
    storeTags();
    storeSubjects();
    storeNotecards();
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");
/* harmony import */ var _notecards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notecards */ "./src/notecards.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form */ "./src/form.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/storage.js");





// pageManager module pattern
// will call DOM functions and functions defined above
const pageManager = (() => {
  const PAGECONTAINER = document.querySelector("#content");

  function resetPage() {
    PAGECONTAINER.textContent = "";
  }

  function addDummyContent() {
    // Dummy Content
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("everything");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("english");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("math");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("science");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("geography");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject("history");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.addTag("tag1");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.addTag("tag2");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.addTag("tag3");
    _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_1__.notecard)(
        "title1",
        ["tag1", "tag2", "tag3"],
        "lorem ipsum blah blah blah",
        "english"
      )
    );
    _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_1__.notecard)(
        "title2",
        ["tag1", "tag2"],
        "lorem ipsum blah blah blaaaaaaah",
        "math"
      )
    );
    _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_1__.notecard)(
        "title3",
        ["tag1", "tag2"],
        "lorem ipsum blah blah blah",
        "science"
      )
    );
    _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_1__.notecard)(
        "title4",
        ["tag3", "tag4"],
        "lorem ipsum blah blah blah",
        "science"
      )
    );
    _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(
      (0,_notecards__WEBPACK_IMPORTED_MODULE_1__.notecard)(
        "title5",
        ["tag2", "tag3"],
        "lorem ipsum blah blah blah",
        "history"
      )
    );
  }

  function initHomepage() {
    // retrieve any saved notecards from local storage
    const storedValues = _storage__WEBPACK_IMPORTED_MODULE_3__.restorer.restore();
    // add retrieved content
    for (const subject of storedValues.subjectList) {
      _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.addSubject(subject);
    }

    for (const tag of storedValues.tagList) {
      _notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.addTag(tag);
    }

    for (const card of storedValues.notecardList) {
      _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.addNotecard(card);
    }

    // Add dummy content if its the first visit
    if (localStorage.getItem("firstVisit") === null) {
      addDummyContent();
      localStorage.setItem("firstVisit", false);
      _storage__WEBPACK_IMPORTED_MODULE_3__.storer.store();
    }

    resetPage();
    PAGECONTAINER.appendChild(
      _homepage__WEBPACK_IMPORTED_MODULE_0__["default"].generateHomePage(
        _notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.getSubjects(),
        _notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.getTags(),
        _notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.getAllNotecards()
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
  if (form.id === _form__WEBPACK_IMPORTED_MODULE_2__.formValidator.subjectFormID) {
    if (_form__WEBPACK_IMPORTED_MODULE_2__.formValidator.validateSubjectForm()) {
      _homepage__WEBPACK_IMPORTED_MODULE_0__["default"].refreshSidebar(_notecards__WEBPACK_IMPORTED_MODULE_1__.subjectStorage.getSubjects());
      _form__WEBPACK_IMPORTED_MODULE_2__.formDOM.removeForm(form);
      _storage__WEBPACK_IMPORTED_MODULE_3__.storer.store();
    }
  } else if (form.id === _form__WEBPACK_IMPORTED_MODULE_2__.formValidator.notecardFormID) {
    if (_form__WEBPACK_IMPORTED_MODULE_2__.formValidator.validateNotecardForm()) {
      _homepage__WEBPACK_IMPORTED_MODULE_0__["default"].refreshBody(_notecards__WEBPACK_IMPORTED_MODULE_1__.notecardStorage.getAllNotecards());
      _homepage__WEBPACK_IMPORTED_MODULE_0__["default"].refreshTags(_notecards__WEBPACK_IMPORTED_MODULE_1__.tagStorage.getTags());
      _form__WEBPACK_IMPORTED_MODULE_2__.formDOM.removeForm(form);
      _storage__WEBPACK_IMPORTED_MODULE_3__.storer.store();
    }
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLcUI7QUFDYTtBQUNDOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixrRUFBMEI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxzQkFBc0I7QUFDOUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLGlFQUF5QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNFQUFzRSxvQkFBb0I7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RSwwQkFBMEI7QUFDdEc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxXQUFXLDBEQUFrQjtBQUM3QixRQUFRLHlEQUFpQjtBQUN6QjtBQUNBLEtBQUs7O0FBRUwsSUFBSSxtRUFBMkI7QUFDL0IsTUFBTSxvREFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwwREFBa0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGLFFBQVEsNkNBQTZDLFFBQVEsdURBQXVELFFBQVE7O0FBRW5OO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLDRFQUFvQztBQUM3RDtBQUNBO0FBQ0EsTUFBTSxvRUFBNEI7QUFDbEMsTUFBTSxnRUFBdUIsQ0FBQyxrRUFBMEI7QUFDeEQsTUFBTSw2REFBb0I7QUFDMUIsTUFBTSxrREFBWTtBQUNsQjtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4Qyx3QkFBd0IsR0FBRyxpQ0FBaUM7QUFDMUc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9EQUFvRCw4QkFBOEIsR0FBRyx1Q0FBdUM7QUFDNUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGtFQUEwQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGtEQUFrRCwwQkFBMEIsR0FBRyxtQ0FBbUM7QUFDbEgsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVpQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeGpCd0M7QUFDekM7QUFDRTs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyx1RUFBK0I7QUFDbEUsTUFBTTtBQUNOLG1DQUFtQyx1RUFBK0I7QUFDbEUsTUFBTTtBQUNOO0FBQ0EsUUFBUSw0RUFBb0M7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLDhEQUEyQjtBQUN2RCw0QkFBNEIsMERBQXVCO0FBQ25ELEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyRUFBd0M7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLDBEQUF1QjtBQUNuRCxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBMkI7QUFDbkM7QUFDQSw0QkFBNEIsMERBQXVCO0FBQ25EO0FBQ0EsTUFBTSxvRUFBNEI7QUFDbEM7QUFDQSxxQkFBcUIsa0VBQTBCO0FBQy9DLE1BQU0sa0RBQVk7QUFDbEIsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQTRCO0FBQ3hELDRCQUE0QiwwREFBdUI7QUFDbkQsS0FBSzs7QUFFTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSwrREFBNEI7QUFDdEM7QUFDQSw4QkFBOEIsMERBQXVCO0FBQ3JELFFBQVEsc0VBQThCO0FBQ3RDO0FBQ0EsUUFBUSxtRUFBMkI7QUFDbkM7QUFDQSxvQkFBb0IsMERBQWtCO0FBQ3RDLFFBQVEsa0RBQVk7QUFDcEIsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzRUFBOEI7QUFDdEM7QUFDQSxRQUFRLG1FQUEyQjtBQUNuQztBQUNBLG9CQUFvQiwwREFBa0I7QUFDdEMsUUFBUSxrREFBWTtBQUNwQixPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMERBQWtCO0FBQ3pDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiw0RUFBb0M7QUFDMUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwREFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwwREFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hheEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVnRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R1M7O0FBRTFFO0FBQ0E7QUFDQSx5QkFBeUIsdUVBQStCO0FBQ3hELG9CQUFvQix5QkFBeUI7QUFDN0M7QUFDQSxzQ0FBc0MsRUFBRTtBQUN4QztBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGtFQUEwQjtBQUNsRCxvQkFBb0Isd0JBQXdCO0FBQzVDLHFDQUFxQyxFQUFFO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsMERBQWtCO0FBQ3RDLG9CQUFvQixvQkFBb0I7QUFDeEMsaUNBQWlDLEVBQUU7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsRUFBRTtBQUNyRDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxFQUFFO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRTJCOzs7Ozs7O1VDdkY1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtDO0FBTWI7QUFDMkI7QUFDSDs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGlFQUF5QjtBQUM3QixJQUFJLGlFQUF5QjtBQUM3QixJQUFJLGlFQUF5QjtBQUM3QixJQUFJLGlFQUF5QjtBQUM3QixJQUFJLGlFQUF5QjtBQUM3QixJQUFJLGlFQUF5QjtBQUM3QixJQUFJLHlEQUFpQjtBQUNyQixJQUFJLHlEQUFpQjtBQUNyQixJQUFJLHlEQUFpQjtBQUNyQixJQUFJLG1FQUEyQjtBQUMvQixNQUFNLG9EQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtRUFBMkI7QUFDL0IsTUFBTSxvREFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksbUVBQTJCO0FBQy9CLE1BQU0sb0RBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1FQUEyQjtBQUMvQixNQUFNLG9EQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxtRUFBMkI7QUFDL0IsTUFBTSxvREFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsc0RBQWdCO0FBQ3pDO0FBQ0E7QUFDQSxNQUFNLGlFQUF5QjtBQUMvQjs7QUFFQTtBQUNBLE1BQU0seURBQWlCO0FBQ3ZCOztBQUVBO0FBQ0EsTUFBTSxtRUFBMkI7QUFDakM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGtEQUFZO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQSxNQUFNLGtFQUF5QjtBQUMvQixRQUFRLGtFQUEwQjtBQUNsQyxRQUFRLDBEQUFrQjtBQUMxQixRQUFRLHVFQUErQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw4REFBMkI7QUFDN0MsUUFBUSxvRUFBaUM7QUFDekMsTUFBTSxnRUFBdUIsQ0FBQyxrRUFBMEI7QUFDeEQsTUFBTSxxREFBa0I7QUFDeEIsTUFBTSxrREFBWTtBQUNsQjtBQUNBLElBQUkscUJBQXFCLCtEQUE0QjtBQUNyRCxRQUFRLHFFQUFrQztBQUMxQyxNQUFNLDZEQUFvQixDQUFDLHVFQUErQjtBQUMxRCxNQUFNLDZEQUFvQixDQUFDLDBEQUFrQjtBQUM3QyxNQUFNLHFEQUFrQjtBQUN4QixNQUFNLGtEQUFZO0FBQ2xCO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm90ZWNhcmRzLy4vc3JjL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzLy4vc3JjL2hvbWVwYWdlLmpzIiwid2VicGFjazovL25vdGVjYXJkcy8uL3NyYy9ub3RlY2FyZHMuanMiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vdGVjYXJkcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbm90ZWNhcmRzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHN1YmplY3RTdG9yYWdlLFxuICB0YWdTdG9yYWdlLFxuICBub3RlY2FyZFN0b3JhZ2UsXG4gIG5vdGVjYXJkLFxufSBmcm9tIFwiLi9ub3RlY2FyZHNcIjtcbmltcG9ydCBob21lcGFnZSBmcm9tIFwiLi9ob21lcGFnZVwiO1xuaW1wb3J0IHsgc3RvcmVyIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCBmb3JtVmFsaWRhdG9yID0gKCgpID0+IHtcbiAgY29uc3Qgc3ViamVjdEZvcm1JRCA9IFwic3ViamVjdC1mb3JtXCI7XG4gIGNvbnN0IG5vdGVjYXJkRm9ybUlEID0gXCJub3RlY2FyZC1mb3JtXCI7XG4gIGNvbnN0IHRpdGxlQ2hhck1heExlbmd0aCA9IDE1O1xuICBjb25zdCBkZXNjcmlwdGlvbkNoYXJNYXhMZW5ndGggPSAzNTA7XG4gIGNvbnN0IHN1YmplY3RDaGFyTWF4TGVuZ3RoID0gMTU7XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVTdWJqZWN0TGVuZ3RoKCkge1xuICAgIGNvbnN0IHN1YmplY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3ViamVjdFwiKTtcbiAgICByZXR1cm4gc3ViamVjdElucHV0LnZhbHVlLmxlbmd0aCA+IHN1YmplY3RDaGFyTWF4TGVuZ3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVTdWJqZWN0SW5wdXR0ZWQoKSB7XG4gICAgY29uc3Qgc3ViamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJqZWN0XCIpO1xuICAgIHJldHVybiBzdWJqZWN0SW5wdXQudmFsdWUubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVTdWJqZWN0RHVwbGljYXRlcygpIHtcbiAgICBjb25zdCBzdWJqZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1YmplY3RcIik7XG4gICAgZm9yIChjb25zdCBzdWJqZWN0IG9mIHN1YmplY3RTdG9yYWdlLmdldFN1YmplY3RzKCkpIHtcbiAgICAgIGlmIChzdWJqZWN0SW5wdXQudmFsdWUgPT09IHN1YmplY3QpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVN1YmplY3RGb3JtKCkge1xuICAgIGNvbnN0IHN1YmplY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3ViamVjdFwiKTtcbiAgICBjb25zdCBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuc3ViamVjdC1pbnB1dC1lcnJvclwiXG4gICAgKTtcblxuICAgIGlmICh2YWxpZGF0ZVN1YmplY3RMZW5ndGgoKSkge1xuICAgICAgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gYElucHV0IG11c3QgYmUgbGVzcyB0aGFuICR7c3ViamVjdENoYXJNYXhMZW5ndGh9IGNoYXJhY3RlcnNgO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh2YWxpZGF0ZVN1YmplY3RJbnB1dHRlZCgpKSB7XG4gICAgICBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBsZWFzZSBlbnRlciBhIHN1YmplY3RcIjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdGVTdWJqZWN0RHVwbGljYXRlcygpKSB7XG4gICAgICBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlN1YmplY3QgYWxyZWFkeSBleGlzdHNcIjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdWJqZWN0U3RvcmFnZS5hZGRTdWJqZWN0KHN1YmplY3RJbnB1dC52YWx1ZSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVRpdGxlTGVuZ3RoKCkge1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuICAgIHJldHVybiB0aXRsZUlucHV0LnZhbHVlLmxlbmd0aCA+IHRpdGxlQ2hhck1heExlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlVGl0bGVJbnB1dHRlZCgpIHtcbiAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcbiAgICByZXR1cm4gdGl0bGVJbnB1dC52YWx1ZS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU5vdGVjYXJkVGl0bGUoKSB7XG4gICAgY29uc3QgdGl0bGVJbnB1dEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGUtaW5wdXQtZXJyb3JcIik7XG5cbiAgICBsZXQgdGl0bGVWYWxpZCA9IHRydWU7XG4gICAgaWYgKHZhbGlkYXRlVGl0bGVMZW5ndGgoKSkge1xuICAgICAgdGl0bGVJbnB1dEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IGBJbnB1dCBtdXN0IGJlIGxlc3MgdGhhbiAke3RpdGxlQ2hhck1heExlbmd0aH0gY2hhcmFjdGVyc2A7XG4gICAgICB0aXRsZVZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRlVGl0bGVJbnB1dHRlZCgpKSB7XG4gICAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQbGVhc2UgZW50ZXIgYSB0aXRsZVwiO1xuICAgICAgdGl0bGVWYWxpZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aXRsZVZhbGlkKSB7XG4gICAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZURlc2NyaXB0aW9uTGVuZ3RoKCkge1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpO1xuICAgIHJldHVybiBkZXNjcmlwdGlvbklucHV0LnZhbHVlLmxlbmd0aCA+IGRlc2NyaXB0aW9uQ2hhck1heExlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRGVzY3JpcHRpb25JbnB1dHRlZCgpIHtcbiAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcbiAgICByZXR1cm4gZGVzY3JpcHRpb25JbnB1dC52YWx1ZS5sZW5ndGggPT09IDA7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZU5vdGVjYXJkRGVzY3JpcHRpb24oKSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5kZXNjcmlwdGlvbi1pbnB1dC1lcnJvclwiXG4gICAgKTtcblxuICAgIGxldCBkZXNjcmlwdGlvblZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodmFsaWRhdGVEZXNjcmlwdGlvbkxlbmd0aCgpKSB7XG4gICAgICBkZXNjcmlwdGlvbklucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gYElucHV0IG11c3QgYmUgbGVzcyB0aGFuICR7ZGVzY3JpcHRpb25DaGFyTWF4TGVuZ3RofSBjaGFyYWN0ZXJzYDtcbiAgICAgIGRlc2NyaXB0aW9uVmFsaWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdGVEZXNjcmlwdGlvbklucHV0dGVkKCkpIHtcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlBsZWFzZSBlbnRlciBhIGRlc2NyaXB0aW9uXCI7XG4gICAgICBkZXNjcmlwdGlvblZhbGlkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGRlc2NyaXB0aW9uVmFsaWQpIHtcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlTm90ZWNhcmRGb3JtKCkge1xuICAgIGNvbnN0IHN1YmplY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbm90ZWNhcmQtaW5wdXQtc3ViamVjdFwiKTtcbiAgICBjb25zdCB0YWdzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhZy1pbnB1dFwiKTtcbiAgICBjb25zdCB0YWdJbnB1dEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFnLWlucHV0LWVycm9yXCIpO1xuXG4gICAgY29uc3QgdGFnc1ZhbHVlcyA9IFtdO1xuICAgIHRhZ3NJbnB1dC5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICghdGFnc1ZhbHVlcy5pbmNsdWRlcyh0YWcudmFsdWUpKSB7XG4gICAgICAgIHRhZ3NWYWx1ZXMucHVzaCh0YWcudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICBpZiAoIXZhbGlkYXRlTm90ZWNhcmRUaXRsZSgpKSB2YWxpZCA9IGZhbHNlO1xuICAgIGlmICghdmFsaWRhdGVOb3RlY2FyZERlc2NyaXB0aW9uKCkpIHZhbGlkID0gZmFsc2U7XG5cbiAgICBsZXQgdGFnVmFsaWQgPSB0cnVlO1xuICAgIHRhZ3NWYWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAxNSkge1xuICAgICAgICB0YWdJbnB1dEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9XG4gICAgICAgICAgXCJBbGwgdGFncyBtdXN0IGJlIGxlc3MgdGhhbiAxNSBjaGFyYWN0ZXJzXCI7XG4gICAgICAgIHRhZ1ZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRhZ0lucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSBmb3IgYWxsIHRhZ3NcIjtcbiAgICAgICAgdGFnVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIXRhZ1ZhbGlkKSB2YWxpZCA9IGZhbHNlO1xuXG4gICAgaWYgKCF2YWxpZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGFnSW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgdGFnc1ZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCF0YWdTdG9yYWdlLmdldFRhZ3MoKS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgdGFnU3RvcmFnZS5hZGRUYWcodmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbm90ZWNhcmRTdG9yYWdlLmFkZE5vdGVjYXJkKFxuICAgICAgbm90ZWNhcmQoXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikudmFsdWUsXG4gICAgICAgIHRhZ3NWYWx1ZXMsXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikudmFsdWUsXG4gICAgICAgIHN1YmplY3RJbnB1dC52YWx1ZVxuICAgICAgKVxuICAgICk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdmFsaWRhdGVTdWJqZWN0Rm9ybSxcbiAgICB2YWxpZGF0ZU5vdGVjYXJkRm9ybSxcbiAgICB2YWxpZGF0ZU5vdGVjYXJkRGVzY3JpcHRpb24sXG4gICAgdmFsaWRhdGVOb3RlY2FyZFRpdGxlLFxuICAgIHZhbGlkYXRlU3ViamVjdExlbmd0aCxcbiAgICB2YWxpZGF0ZVN1YmplY3RJbnB1dHRlZCxcbiAgICB2YWxpZGF0ZVN1YmplY3REdXBsaWNhdGVzLFxuICAgIHZhbGlkYXRlVGl0bGVMZW5ndGgsXG4gICAgdmFsaWRhdGVUaXRsZUlucHV0dGVkLFxuICAgIHZhbGlkYXRlRGVzY3JpcHRpb25MZW5ndGgsXG4gICAgdmFsaWRhdGVEZXNjcmlwdGlvbklucHV0dGVkLFxuICAgIGRlc2NyaXB0aW9uQ2hhck1heExlbmd0aCxcbiAgICB0aXRsZUNoYXJNYXhMZW5ndGgsXG4gICAgc3ViamVjdENoYXJNYXhMZW5ndGgsXG4gICAgc3ViamVjdEZvcm1JRCxcbiAgICBub3RlY2FyZEZvcm1JRCxcbiAgfTtcbn0pKCk7XG5cbmNvbnN0IGZvcm1ET00gPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBnZW5lcmF0ZU92ZXJsYXkoKSB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwicG9wLXVwLW92ZXJsYXlcIik7XG5cbiAgICByZXR1cm4gb3ZlcmxheTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUZvcm0ocG9wVXApIHtcbiAgICBwb3BVcC5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcC11cC1vdmVybGF5XCIpLnJlbW92ZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVDbG9zZUJ1dHRvbihmb3JtKSB7XG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgY2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcInBvcC11cC1jbG9zZVwiKTtcbiAgICBjbG9zZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiWFwiO1xuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICByZW1vdmVGb3JtKGZvcm0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNsb3NlQnV0dG9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVUYWdJbnB1dChkZWZhdWx0VGFnKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhZy1pbnB1dC1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCB0YWdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YWdJbnB1dC5jbGFzc0xpc3QuYWRkKFwidGFnLWlucHV0XCIpO1xuICAgIHRhZ0lucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIHRhZ0lucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibm90ZWNhcmQtaW5wdXQtdGFnXCIpO1xuICAgIHRhZ0lucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJub3RlY2FyZC1pbnB1dC10YWdcIik7XG4gICAgdGFnSW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgZGVmYXVsdFRhZyk7XG4gICAgdGFnSW5wdXQuc2V0QXR0cmlidXRlKFwibGlzdFwiLCBcInRhZy1saXN0XCIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YWdJbnB1dCk7XG5cbiAgICBjb25zdCB0YWdEYXRhbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkYXRhbGlzdFwiKTtcbiAgICB0YWdEYXRhbGlzdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRhZy1saXN0XCIpO1xuICAgIHRhZ1N0b3JhZ2UuZ2V0VGFncygpLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0YWcpO1xuICAgICAgdGFnRGF0YWxpc3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFnRGF0YWxpc3QpO1xuXG4gICAgY29uc3QgcmVtb3ZlVGFnSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZVRhZ0lucHV0LmNsYXNzTGlzdC5hZGQoXCJyZW1vdmUtdGFnXCIpO1xuICAgIHJlbW92ZVRhZ0lucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgcmVtb3ZlVGFnSW5wdXQudGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICByZW1vdmVUYWdJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW1vdmVUYWdJbnB1dCk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVTdWJtaXRCdXR0b24oKSB7XG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdWJtaXRCdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIlN1Ym1pdFwiO1xuICAgIHJldHVybiBzdWJtaXRCdXR0b247XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUNvbmZpcm1TdWJqZWN0RGVsZXRlRm9ybShzdWJqZWN0KSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwicG9wLXVwXCIpO1xuXG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1Sb3cxLmNsYXNzTGlzdC5hZGQoXCJmb3JtLXJvd1wiKTtcbiAgICBmb3JtUm93MS5jbGFzc0xpc3QuYWRkKFwiY29uZmlybS1kZWxldGUtd2FybmluZy1jb250YWluZXJcIik7XG5cbiAgICBjb25zdCBjb25maXJtRGVsZXRlV2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uZmlybURlbGV0ZVdhcm5pbmcudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc3ViamVjdCBcIiR7c3ViamVjdH1cIj8gQWxsIG5vdGVjYXJkcyBjb250YWluZWQgaW4gdGhlIHN1YmplY3QgXCIke3N1YmplY3R9XCIgd2lsbCBub3QgYmUgZGVsZXRlZC4gVGhlIG5vdGVjYXJkcyBpbiB0aGUgc3ViamVjdCBcIiR7c3ViamVjdH1cIiB3aWxsIHN0aWxsIGJlIHByZXNlbnQgaW4gdGhlIGV2ZXJ5dGhpbmcgc3ViamVjdGA7XG5cbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChjb25maXJtRGVsZXRlV2FybmluZyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSk7XG5cbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybVJvdzIuY2xhc3NMaXN0LmFkZChcImZvcm0tcm93XCIpO1xuXG4gICAgY29uc3QgY2FuY2VsRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjYW5jZWxEZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChcImNhbmNlbC1kZWxldGUtYnV0dG9uXCIpO1xuICAgIGNhbmNlbERlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG4gICAgY2FuY2VsRGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICByZW1vdmVGb3JtKGZvcm0pO1xuICAgIH0pO1xuICAgIGZvcm1Sb3cyLmFwcGVuZENoaWxkKGNhbmNlbERlbGV0ZUJ1dHRvbik7XG5cbiAgICBjb25zdCBjb25maXJtRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25maXJtRGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJjb25maXJtLWRlbGV0ZS1idXR0b25cIik7XG4gICAgY29uZmlybURlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ29uZmlybVwiO1xuICAgIGNvbmZpcm1EZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgY2FyZCBvZiBub3RlY2FyZFN0b3JhZ2UuZ2V0Tm90ZWNhcmRCeVN1YmplY3Qoc3ViamVjdCkpIHtcbiAgICAgICAgY2FyZC5zdWJqZWN0ID0gXCJldmVyeXRoaW5nXCI7XG4gICAgICB9XG4gICAgICBzdWJqZWN0U3RvcmFnZS5yZW1vdmVTdWJqZWN0KHN1YmplY3QpO1xuICAgICAgaG9tZXBhZ2UucmVmcmVzaFNpZGViYXIoc3ViamVjdFN0b3JhZ2UuZ2V0U3ViamVjdHMoKSk7XG4gICAgICBob21lcGFnZS5yZWZyZXNoQm9keSgpO1xuICAgICAgc3RvcmVyLnN0b3JlKCk7XG4gICAgICByZW1vdmVGb3JtKGZvcm0pO1xuICAgIH0pO1xuICAgIGZvcm1Sb3cyLmFwcGVuZENoaWxkKGNvbmZpcm1EZWxldGVCdXR0b24pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZm9ybVJvdzIpO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChnZW5lcmF0ZUNsb3NlQnV0dG9uKGZvcm0pKTtcblxuICAgIHJldHVybiBmb3JtO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVOb3RlY2FyZEZvcm0oZGVmYXVsdFRpdGxlLCBkZWZhdWx0RGVzY3JpcHRpb24sIGRlZmF1bHRUYWdzKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcInBvcC11cFwiKTtcbiAgICBmb3JtLnNldEF0dHJpYnV0ZShcImlkXCIsIGZvcm1WYWxpZGF0b3Iubm90ZWNhcmRGb3JtSUQpO1xuXG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1Sb3cxLmNsYXNzTGlzdC5hZGQoXCJmb3JtLXJvd1wiKTtcblxuICAgIGNvbnN0IGZvcm1JdGVtMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybUl0ZW0xLmNsYXNzTGlzdC5hZGQoXCJmb3JtLWl0ZW1cIik7XG5cbiAgICBjb25zdCB0aXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHRpdGxlTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwidGl0bGVcIik7XG4gICAgdGl0bGVMYWJlbC50ZXh0Q29udGVudCA9IFwiVGl0bGVcIjtcbiAgICBmb3JtSXRlbTEuYXBwZW5kQ2hpbGQodGl0bGVMYWJlbCk7XG5cbiAgICBjb25zdCB0aXRsZUlucHV0RXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1lcnJvclwiKTtcbiAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZS1pbnB1dC1lcnJvclwiKTtcbiAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcblxuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICB0aXRsZUlucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGl0bGVcIik7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwidGl0bGVcIik7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBkZWZhdWx0VGl0bGUpO1xuICAgIHRpdGxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsICgpID0+IHtcbiAgICAgIGlmIChmb3JtVmFsaWRhdG9yLnZhbGlkYXRlTm90ZWNhcmRUaXRsZSgpKSB7XG4gICAgICAgIHRpdGxlSW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXZhbGlkXCIpO1xuICAgICAgICB0aXRsZUlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnB1dC1pbnZhbGlkXCIpO1xuICAgICAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpdGxlSW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LWludmFsaWRcIik7XG4gICAgICAgIHRpdGxlSW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcImlucHV0LXZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRpdGxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgIHRpdGxlSW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBgJHt0aXRsZUlucHV0LnZhbHVlLmxlbmd0aH0vJHtmb3JtVmFsaWRhdG9yLnRpdGxlQ2hhck1heExlbmd0aH1gO1xuICAgICAgaWYgKFxuICAgICAgICAhZm9ybVZhbGlkYXRvci52YWxpZGF0ZVRpdGxlTGVuZ3RoKCkgJiZcbiAgICAgICAgIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVUaXRsZUlucHV0dGVkKClcbiAgICAgICkge1xuICAgICAgICB0aXRsZUlucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJlcnJvci12YWxpZFwiKTtcbiAgICAgICAgdGl0bGVJbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItaW52YWxpZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpdGxlSW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVycm9yLWludmFsaWRcIik7XG4gICAgICAgIHRpdGxlSW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLXZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvcm1JdGVtMS5hcHBlbmRDaGlsZCh0aXRsZUlucHV0KTtcbiAgICBmb3JtSXRlbTEuYXBwZW5kQ2hpbGQodGl0bGVJbnB1dEVycm9yTWVzc2FnZSk7XG4gICAgZm9ybVJvdzEuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0xKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cxKTtcblxuICAgIGNvbnN0IGZvcm1Sb3cyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtUm93Mi5jbGFzc0xpc3QuYWRkKFwiZm9ybS1yb3dcIik7XG5cbiAgICBjb25zdCBmb3JtSXRlbTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1JdGVtMi5jbGFzc0xpc3QuYWRkKFwiZm9ybS1pdGVtXCIpO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBkZXNjcmlwdGlvbkxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImRlc2NyaXB0aW9uXCIpO1xuICAgIGRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBcIkRlc2NyaXB0aW9uXCI7XG4gICAgZm9ybUl0ZW0yLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uTGFiZWwpO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtZXJyb3JcIik7XG4gICAgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwiZGVzY3JpcHRpb24taW5wdXQtZXJyb3JcIik7XG4gICAgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZXNjcmlwdGlvblwiKTtcbiAgICBkZXNjcmlwdGlvbklucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJkZXNjcmlwdGlvblwiKTtcbiAgICBkZXNjcmlwdGlvbklucHV0LnRleHRDb250ZW50ID0gZGVmYXVsdERlc2NyaXB0aW9uO1xuICAgIGRlc2NyaXB0aW9uSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsICgpID0+IHtcbiAgICAgIGlmIChmb3JtVmFsaWRhdG9yLnZhbGlkYXRlTm90ZWNhcmREZXNjcmlwdGlvbigpKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXZhbGlkXCIpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnB1dC1pbnZhbGlkXCIpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCLinJNcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LWludmFsaWRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcImlucHV0LXZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGRlc2NyaXB0aW9uSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsICgpID0+IHtcbiAgICAgIGRlc2NyaXB0aW9uSW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBgJHtkZXNjcmlwdGlvbklucHV0LnZhbHVlLmxlbmd0aH0vJHtmb3JtVmFsaWRhdG9yLmRlc2NyaXB0aW9uQ2hhck1heExlbmd0aH1gO1xuICAgICAgaWYgKFxuICAgICAgICAhZm9ybVZhbGlkYXRvci52YWxpZGF0ZURlc2NyaXB0aW9uTGVuZ3RoKCkgJiZcbiAgICAgICAgIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVEZXNjcmlwdGlvbklucHV0dGVkKClcbiAgICAgICkge1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJlcnJvci12YWxpZFwiKTtcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKFwiZXJyb3ItaW52YWxpZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImVycm9yLWludmFsaWRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLXZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvcm1JdGVtMi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbklucHV0KTtcbiAgICBmb3JtSXRlbTIuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb25JbnB1dEVycm9yTWVzc2FnZSk7XG4gICAgZm9ybVJvdzIuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0yKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3cyKTtcblxuICAgIGNvbnN0IGZvcm1Sb3czID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtUm93My5jbGFzc0xpc3QuYWRkKFwiZm9ybS1yb3dcIik7XG5cbiAgICBjb25zdCBmb3JtSXRlbTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1JdGVtMy5jbGFzc0xpc3QuYWRkKFwiZm9ybS1pdGVtXCIpO1xuXG4gICAgY29uc3Qgbm90ZWNhcmRTdWJqZWN0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbm90ZWNhcmRTdWJqZWN0TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibm90ZWNhcmQtaW5wdXQtc3ViamVjdFwiKTtcbiAgICBub3RlY2FyZFN1YmplY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiU3ViamVjdFwiO1xuICAgIGZvcm1JdGVtMy5hcHBlbmRDaGlsZChub3RlY2FyZFN1YmplY3RMYWJlbCk7XG5cbiAgICBjb25zdCBub3RlY2FyZFN1YmplY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgbm90ZWNhcmRTdWJqZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJub3RlY2FyZC1pbnB1dC1zdWJqZWN0XCIpO1xuICAgIG5vdGVjYXJkU3ViamVjdElucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJub3RlY2FyZC1pbnB1dC1zdWJqZWN0XCIpO1xuICAgIGNvbnN0IGRlZmF1bHRTdWJqZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJqZWN0LXNlbGVjdGVkXCIpO1xuICAgIGxldCBkZWZhdWx0U3ViamVjdFZhbHVlID0gXCJub25lXCI7XG4gICAgaWYgKGRlZmF1bHRTdWJqZWN0ICE9PSBudWxsKVxuICAgICAgZGVmYXVsdFN1YmplY3RWYWx1ZSA9IGRlZmF1bHRTdWJqZWN0LnRleHRDb250ZW50O1xuICAgIHN1YmplY3RTdG9yYWdlLmdldFN1YmplY3RzKCkuZm9yRWFjaCgoc3ViamVjdCkgPT4ge1xuICAgICAgaWYgKHN1YmplY3QgIT09IFwiZXZlcnl0aGluZ1wiKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzdWJqZWN0KTtcbiAgICAgICAgaWYgKHN1YmplY3QgPT09IGRlZmF1bHRTdWJqZWN0VmFsdWUpIHtcbiAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBzdWJqZWN0O1xuICAgICAgICBub3RlY2FyZFN1YmplY3RJbnB1dC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvcm1JdGVtMy5hcHBlbmRDaGlsZChub3RlY2FyZFN1YmplY3RJbnB1dCk7XG4gICAgZm9ybVJvdzMuYXBwZW5kQ2hpbGQoZm9ybUl0ZW0zKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGZvcm1Sb3czKTtcblxuICAgIGNvbnN0IGZvcm1Sb3c0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtUm93NC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1yb3dcIik7XG5cbiAgICBjb25zdCBmb3JtSXRlbTQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1JdGVtNC5jbGFzc0xpc3QuYWRkKFwiZm9ybS1pdGVtXCIpO1xuXG4gICAgY29uc3QgdGFnTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgdGFnTGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibm90ZWNhcmQtaW5wdXQtdGFnXCIpO1xuICAgIHRhZ0xhYmVsLnRleHRDb250ZW50ID0gXCJUYWdzXCI7XG4gICAgZm9ybUl0ZW00LmFwcGVuZENoaWxkKHRhZ0xhYmVsKTtcblxuICAgIGNvbnN0IGFkZFRhZ0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGRUYWdJbnB1dC5jbGFzc0xpc3QuYWRkKFwiYWRkLXRhZ1wiKTtcbiAgICBhZGRUYWdJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgIGFkZFRhZ0lucHV0LnRleHRDb250ZW50ID0gXCIrXCI7XG4gICAgYWRkVGFnSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhZy1pbnB1dC1jb250YWluZXJcIikubGVuZ3RoID4gNSkgcmV0dXJuO1xuICAgICAgZm9ybUl0ZW00Lmluc2VydEJlZm9yZShnZW5lcmF0ZVRhZ0lucHV0KFwiXCIpLCBhZGRUYWdJbnB1dCk7XG4gICAgfSk7XG4gICAgZm9yIChjb25zdCB0YWcgb2YgZGVmYXVsdFRhZ3MpIHtcbiAgICAgIGZvcm1JdGVtNC5hcHBlbmRDaGlsZChnZW5lcmF0ZVRhZ0lucHV0KHRhZykpO1xuICAgIH1cbiAgICBmb3JtSXRlbTQuYXBwZW5kQ2hpbGQoYWRkVGFnSW5wdXQpO1xuXG4gICAgY29uc3QgdGFnSW5wdXRFcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhZ0lucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1lcnJvclwiKTtcbiAgICB0YWdJbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwidGFnLWlucHV0LWVycm9yXCIpO1xuICAgIHRhZ0lucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBmb3JtSXRlbTQuYXBwZW5kQ2hpbGQodGFnSW5wdXRFcnJvck1lc3NhZ2UpO1xuICAgIGZvcm1Sb3c0LmFwcGVuZENoaWxkKGZvcm1JdGVtNCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93NCk7XG5cbiAgICBjb25zdCBmb3JtUm93NSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybVJvdzUuY2xhc3NMaXN0LmFkZChcImZvcm0tcm93XCIpO1xuXG4gICAgZm9ybVJvdzUuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVTdWJtaXRCdXR0b24oKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93NSk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGdlbmVyYXRlQ2xvc2VCdXR0b24oZm9ybSkpO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZVN1YmplY3RGb3JtKGRlZmF1bHRWYWx1ZSkge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJwb3AtdXBcIik7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBmb3JtVmFsaWRhdG9yLnN1YmplY3RGb3JtSUQpO1xuXG4gICAgY29uc3QgZm9ybVJvdzEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcm1Sb3cxLmNsYXNzTGlzdC5hZGQoXCJmb3JtLXJvd1wiKTtcblxuICAgIGNvbnN0IGZvcm1JdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JtSXRlbS5jbGFzc0xpc3QuYWRkKFwiZm9ybS1pdGVtXCIpO1xuXG4gICAgY29uc3Qgc3ViamVjdExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIHN1YmplY3RMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJzdWJqZWN0XCIpO1xuICAgIHN1YmplY3RMYWJlbC50ZXh0Q29udGVudCA9IFwiTmV3IFN1YmplY3RcIjtcbiAgICBmb3JtSXRlbS5hcHBlbmRDaGlsZChzdWJqZWN0TGFiZWwpO1xuXG4gICAgY29uc3Qgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZChcImlucHV0LWVycm9yXCIpO1xuICAgIHN1YmplY3RJbnB1dEVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKFwic3ViamVjdC1pbnB1dC1lcnJvclwiKTtcbiAgICBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgY29uc3Qgc3ViamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHN1YmplY3RJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBzdWJqZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzdWJqZWN0XCIpO1xuICAgIHN1YmplY3RJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwic3ViamVjdFwiKTtcbiAgICBzdWJqZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgZGVmYXVsdFZhbHVlKTtcbiAgICBzdWJqZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVTdWJqZWN0TGVuZ3RoKCkgJiZcbiAgICAgICAgIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVTdWJqZWN0SW5wdXR0ZWQoKSAmJlxuICAgICAgICAhZm9ybVZhbGlkYXRvci52YWxpZGF0ZVN1YmplY3REdXBsaWNhdGVzKClcbiAgICAgICkge1xuICAgICAgICBzdWJqZWN0SW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXZhbGlkXCIpO1xuICAgICAgICBzdWJqZWN0SW5wdXQuY2xhc3NMaXN0LnJlbW92ZShcImlucHV0LWludmFsaWRcIik7XG4gICAgICAgIHN1YmplY3RJbnB1dEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IFwi4pyTXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJqZWN0SW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LWludmFsaWRcIik7XG4gICAgICAgIHN1YmplY3RJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5wdXQtdmFsaWRcIik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc3ViamVjdElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoKSA9PiB7XG4gICAgICBpZiAoIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVTdWJqZWN0RHVwbGljYXRlcygpKSB7XG4gICAgICAgIHN1YmplY3RJbnB1dEVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IGAke3N1YmplY3RJbnB1dC52YWx1ZS5sZW5ndGh9LyR7Zm9ybVZhbGlkYXRvci5zdWJqZWN0Q2hhck1heExlbmd0aH1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gXCJTdWJqZWN0IGFscmVhZHkgZXhpc3RzXCI7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgICFmb3JtVmFsaWRhdG9yLnZhbGlkYXRlU3ViamVjdExlbmd0aCgpICYmXG4gICAgICAgICFmb3JtVmFsaWRhdG9yLnZhbGlkYXRlU3ViamVjdElucHV0dGVkKCkgJiZcbiAgICAgICAgIWZvcm1WYWxpZGF0b3IudmFsaWRhdGVTdWJqZWN0RHVwbGljYXRlcygpXG4gICAgICApIHtcbiAgICAgICAgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJlcnJvci12YWxpZFwiKTtcbiAgICAgICAgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJlcnJvci1pbnZhbGlkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3ViamVjdElucHV0RXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoXCJlcnJvci1pbnZhbGlkXCIpO1xuICAgICAgICBzdWJqZWN0SW5wdXRFcnJvck1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLXZhbGlkXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGZvcm1JdGVtLmFwcGVuZENoaWxkKHN1YmplY3RJbnB1dCk7XG4gICAgZm9ybUl0ZW0uYXBwZW5kQ2hpbGQoc3ViamVjdElucHV0RXJyb3JNZXNzYWdlKTtcbiAgICBmb3JtUm93MS5hcHBlbmRDaGlsZChmb3JtSXRlbSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93MSk7XG5cbiAgICBjb25zdCBmb3JtUm93MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9ybVJvdzIuY2xhc3NMaXN0LmFkZChcImZvcm0tcm93XCIpO1xuXG4gICAgZm9ybVJvdzIuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVTdWJtaXRCdXR0b24oKSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChmb3JtUm93Mik7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGdlbmVyYXRlQ2xvc2VCdXR0b24oZm9ybSkpO1xuXG4gICAgcmV0dXJuIGZvcm07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdlbmVyYXRlTm90ZWNhcmRGb3JtLFxuICAgIGdlbmVyYXRlU3ViamVjdEZvcm0sXG4gICAgZ2VuZXJhdGVPdmVybGF5LFxuICAgIHJlbW92ZUZvcm0sXG4gICAgZ2VuZXJhdGVDb25maXJtU3ViamVjdERlbGV0ZUZvcm0sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBmb3JtRE9NLCBmb3JtVmFsaWRhdG9yIH07XG4iLCJpbXBvcnQgeyBub3RlY2FyZFN0b3JhZ2UsIHN1YmplY3RTdG9yYWdlLCB0YWdTdG9yYWdlIH0gZnJvbSBcIi4vbm90ZWNhcmRzXCI7XG5pbXBvcnQgeyBmb3JtRE9NIH0gZnJvbSBcIi4vZm9ybVwiO1xuaW1wb3J0IHsgc3RvcmVyIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCBub3RlY2FyZEZpbHRlcmVyID0gKCgpID0+IHtcbiAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRTdWJqZWN0KCkge1xuICAgIGNvbnN0IHNlbGVjdGVkU3ViamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViamVjdC1zZWxlY3RlZFwiKTtcbiAgICBpZiAoc2VsZWN0ZWRTdWJqZWN0ID09PSBudWxsKSByZXR1cm4gXCJub25lXCI7XG4gICAgcmV0dXJuIHNlbGVjdGVkU3ViamVjdC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlbGVjdGVkVGFncygpIHtcbiAgICBjb25zdCBzZWxlY3RlZFRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhZy1zZWxlY3RlZFwiKTtcbiAgICBjb25zdCBzZWxlY3RlZFRhZ3NUZXh0Q29udGVudCA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0ZWRUYWcgb2Ygc2VsZWN0ZWRUYWdzKSB7XG4gICAgICBzZWxlY3RlZFRhZ3NUZXh0Q29udGVudC5wdXNoKHNlbGVjdGVkVGFnLnRleHRDb250ZW50KTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGVkVGFnc1RleHRDb250ZW50Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwibm9uZVwiO1xuICAgIHJldHVybiBzZWxlY3RlZFRhZ3NUZXh0Q29udGVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlcigpIHtcbiAgICBjb25zdCBzZWxlY3RlZFN1YmplY3QgPSBnZXRTZWxlY3RlZFN1YmplY3QoKTtcbiAgICBjb25zdCBzZWxlY3RlZFRhZ3MgPSBnZXRTZWxlY3RlZFRhZ3MoKTtcbiAgICBsZXQgbm90ZWNhcmRzID0gW107XG5cbiAgICBpZiAoc2VsZWN0ZWRTdWJqZWN0ID09PSBcIm5vbmVcIikge1xuICAgICAgbm90ZWNhcmRzID0gbm90ZWNhcmRzLmNvbmNhdChub3RlY2FyZFN0b3JhZ2UuZ2V0QWxsTm90ZWNhcmRzKCkpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWRTdWJqZWN0ID09PSBcImV2ZXJ5dGhpbmdcIikge1xuICAgICAgbm90ZWNhcmRzID0gbm90ZWNhcmRzLmNvbmNhdChub3RlY2FyZFN0b3JhZ2UuZ2V0QWxsTm90ZWNhcmRzKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub3RlY2FyZHMgPSBub3RlY2FyZHMuY29uY2F0KFxuICAgICAgICBub3RlY2FyZFN0b3JhZ2UuZ2V0Tm90ZWNhcmRCeVN1YmplY3Qoc2VsZWN0ZWRTdWJqZWN0KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0ZWRUYWdzICE9PSBcIm5vbmVcIikge1xuICAgICAgbm90ZWNhcmRzID0gbm90ZWNhcmRzLmZpbHRlcigoY2FyZCkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHRhZyBvZiBzZWxlY3RlZFRhZ3MpIHtcbiAgICAgICAgICBpZiAoIWNhcmQudGFncy5pbmNsdWRlcyh0YWcpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5vdGVjYXJkcztcbiAgfVxuXG4gIHJldHVybiB7IGZpbHRlciB9O1xufSkoKTtcblxuY29uc3QgZmxpcHBlciA9ICgoKSA9PiB7XG4gIGZ1bmN0aW9uIGZsaXBUb0Zyb250KGNhcmRDbGFzc2xpc3QpIHtcbiAgICBjYXJkQ2xhc3NsaXN0LnJlbW92ZShcInJvdGF0ZWRcIik7XG4gIH1cblxuICBmdW5jdGlvbiBmbGlwVG9CYWNrKGNhcmRDbGFzc2xpc3QpIHtcbiAgICBjYXJkQ2xhc3NsaXN0LnJlbW92ZShcInJvdGF0ZWRcIik7XG4gICAgY2FyZENsYXNzbGlzdC5hZGQoXCJyb3RhdGVkXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmxpcChjYXJkQ2xhc3NsaXN0KSB7XG4gICAgaWYgKCFjYXJkQ2xhc3NsaXN0LmNvbnRhaW5zKFwicm90YXRlZFwiKSkge1xuICAgICAgZmxpcFRvQmFjayhjYXJkQ2xhc3NsaXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxpcFRvRnJvbnQoY2FyZENsYXNzbGlzdCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmxpcEFsbChub3RlY2FyZHMpIHtcbiAgICBsZXQgYWxsRnJvbnQgPSB0cnVlO1xuXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIG5vdGVjYXJkcykge1xuICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm90YXRlZFwiKSkge1xuICAgICAgICBhbGxGcm9udCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWxsRnJvbnQpIHtcbiAgICAgIGZvciAoY29uc3QgY2FyZCBvZiBub3RlY2FyZHMpIGZsaXBUb0JhY2soY2FyZC5jbGFzc0xpc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGNhcmQgb2Ygbm90ZWNhcmRzKSBmbGlwVG9Gcm9udChjYXJkLmNsYXNzTGlzdCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgZmxpcCwgZmxpcEFsbCB9O1xufSkoKTtcblxuY29uc3QgaG9tZXBhZ2UgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBnZW5lcmF0ZUhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xuXG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgaGVhZGVyVGl0bGUudGV4dENvbnRlbnQgPSBcIk5vdGVjYXJkcyFcIjtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyVGl0bGUpO1xuXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuYXYuY2xhc3NMaXN0LmFkZChcIm5hdlwiKTtcblxuICAgIGNvbnN0IGFkZFN1YmplY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGFkZFN1YmplY3RCdXR0b24udGV4dENvbnRlbnQgPSBcIkFkZCBTdWJqZWN0XCI7XG5cbiAgICBhZGRTdWJqZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybURPTS5nZW5lcmF0ZVN1YmplY3RGb3JtKFwiXCIpKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRE9NLmdlbmVyYXRlT3ZlcmxheSgpKTtcbiAgICB9KTtcblxuICAgIG5hdi5hcHBlbmRDaGlsZChhZGRTdWJqZWN0QnV0dG9uKTtcblxuICAgIGNvbnN0IHJlbW92ZVN1YmplY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJlbW92ZVN1YmplY3RCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlbW92ZSBTdWJqZWN0XCI7XG4gICAgcmVtb3ZlU3ViamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlLXN1YmplY3QtYnV0dG9uXCIpO1xuICAgIHJlbW92ZVN1YmplY3RCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgcmVtb3ZlU3ViamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBmb3JtRE9NLmdlbmVyYXRlQ29uZmlybVN1YmplY3REZWxldGVGb3JtKFxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3ViamVjdC1zZWxlY3RlZFwiKS50ZXh0Q29udGVudFxuICAgICAgICApXG4gICAgICApO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1ET00uZ2VuZXJhdGVPdmVybGF5KCkpO1xuICAgIH0pO1xuXG4gICAgbmF2LmFwcGVuZENoaWxkKHJlbW92ZVN1YmplY3RCdXR0b24pO1xuXG4gICAgY29uc3QgZWRpdFN1YmplY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGVkaXRTdWJqZWN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0IFN1YmplY3RcIjtcbiAgICBlZGl0U3ViamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1zdWJqZWN0LWJ1dHRvblwiKTtcbiAgICBlZGl0U3ViamVjdEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBlZGl0U3ViamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFN1YmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1YmplY3Qtc2VsZWN0ZWRcIik7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGZvcm1ET00uZ2VuZXJhdGVTdWJqZWN0Rm9ybShjdXJyZW50U3ViamVjdC50ZXh0Q29udGVudClcbiAgICAgICk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybURPTS5nZW5lcmF0ZU92ZXJsYXkoKSk7XG4gICAgICBjdXJyZW50U3ViamVjdC5yZW1vdmUoKTtcbiAgICAgIHN1YmplY3RTdG9yYWdlLnJlbW92ZVN1YmplY3QoY3VycmVudFN1YmplY3QudGV4dENvbnRlbnQpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICByZWZyZXNoU2lkZWJhcihzdWJqZWN0U3RvcmFnZS5nZXRTdWJqZWN0cygpKTtcbiAgICAgIHN0b3Jlci5zdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgbmF2LmFwcGVuZENoaWxkKGVkaXRTdWJqZWN0QnV0dG9uKTtcblxuICAgIGNvbnN0IGFkZE5vdGVjYXJkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBhZGROb3RlY2FyZEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQWRkIE5vdGVjYXJkXCI7XG5cbiAgICBhZGROb3RlY2FyZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm1ET00uZ2VuZXJhdGVOb3RlY2FyZEZvcm0oXCJcIiwgXCJcIiwgW10pKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRE9NLmdlbmVyYXRlT3ZlcmxheSgpKTtcbiAgICB9KTtcblxuICAgIG5hdi5hcHBlbmRDaGlsZChhZGROb3RlY2FyZEJ1dHRvbik7XG5cbiAgICBjb25zdCBmbGlwQWxsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBmbGlwQWxsQnV0dG9uLnRleHRDb250ZW50ID0gXCJGbGlwIEFsbFwiO1xuXG4gICAgZmxpcEFsbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZmxpcHBlci5mbGlwQWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubm90ZWNhcmQtaW5uZXJcIikpO1xuICAgIH0pO1xuXG4gICAgbmF2LmFwcGVuZENoaWxkKGZsaXBBbGxCdXR0b24pO1xuXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKG5hdik7XG4gICAgcmV0dXJuIGhlYWRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlQm9keShub3RlY2FyZExpc3QpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJib2R5XCIpO1xuXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIG5vdGVjYXJkTGlzdCkge1xuICAgICAgY29uc3Qgbm90ZWNhcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgbm90ZWNhcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5vdGVjYXJkXCIpO1xuXG4gICAgICBjb25zdCBub3RlY2FyZElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5vdGVjYXJkSW5uZXIuY2xhc3NMaXN0LmFkZChcIm5vdGVjYXJkLWlubmVyXCIpO1xuXG4gICAgICBjb25zdCBub3RlY2FyZEZyb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5vdGVjYXJkRnJvbnQuY2xhc3NMaXN0LmFkZChcIm5vdGVjYXJkLWZyb250XCIpO1xuXG4gICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGl0bGVcIik7XG4gICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGNhcmQudGl0bGU7XG4gICAgICBub3RlY2FyZEZyb250LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIG5vdGVjYXJkSW5uZXIuYXBwZW5kQ2hpbGQobm90ZWNhcmRGcm9udCk7XG5cbiAgICAgIGNvbnN0IG5vdGVjYXJkQmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBub3RlY2FyZEJhY2suY2xhc3NMaXN0LmFkZChcIm5vdGVjYXJkLWJhY2tcIik7XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJkZXNjcmlwdGlvblwiKTtcbiAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gY2FyZC5jb250ZW50O1xuICAgICAgbm90ZWNhcmRCYWNrLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgY29uc3Qgbm90ZWNhcmRPcHRpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5vdGVjYXJkT3B0aW9ucy5jbGFzc0xpc3QuYWRkKFwibm90ZWNhcmQtYmFjay1vcHRpb25zXCIpO1xuICAgICAgbm90ZWNhcmRPcHRpb25zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgY29uc3QgdGFncyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICB0YWdzLmNsYXNzTGlzdC5hZGQoXCJub3RlY2FyZC10YWdzXCIpO1xuICAgICAgdGFncy50ZXh0Q29udGVudCA9IGNhcmQudGFncy5qb2luKFwiLCBcIik7XG4gICAgICBub3RlY2FyZE9wdGlvbnMuYXBwZW5kQ2hpbGQodGFncyk7XG5cbiAgICAgIGNvbnN0IGVkaXROb3RlY2FyZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBlZGl0Tm90ZWNhcmRCdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtbm90ZWNhcmQtYnV0dG9uXCIpO1xuICAgICAgZWRpdE5vdGVjYXJkQnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0XCI7XG4gICAgICBlZGl0Tm90ZWNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICAgIGZvcm1ET00uZ2VuZXJhdGVOb3RlY2FyZEZvcm0oY2FyZC50aXRsZSwgY2FyZC5jb250ZW50LCBjYXJkLnRhZ3MpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtRE9NLmdlbmVyYXRlT3ZlcmxheSgpKTtcbiAgICAgICAgbm90ZWNhcmRTdG9yYWdlLnJlbW92ZU5vdGVjYXJkKGNhcmQpO1xuICAgICAgICBub3RlY2FyZENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgdGFnU3RvcmFnZS5yZW1vdmVVbnVzZWRUYWdzKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICByZWZyZXNoVGFncyh0YWdTdG9yYWdlLmdldFRhZ3MoKSk7XG4gICAgICAgIHN0b3Jlci5zdG9yZSgpO1xuICAgICAgfSk7XG4gICAgICBub3RlY2FyZE9wdGlvbnMuYXBwZW5kQ2hpbGQoZWRpdE5vdGVjYXJkQnV0dG9uKTtcblxuICAgICAgY29uc3Qgb3B0aW9uc0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBvcHRpb25zQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJub3RlY2FyZC1iYWNrLWJ1dHRvblwiKTtcbiAgICAgIG9wdGlvbnNCdXR0b24udGV4dENvbnRlbnQgPSBcIuKYsFwiO1xuICAgICAgb3B0aW9uc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKG9wdGlvbnNCdXR0b24udGV4dENvbnRlbnQgPT09IFwi4piwXCIpIHtcbiAgICAgICAgICBvcHRpb25zQnV0dG9uLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgZGVzY3JpcHRpb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIG5vdGVjYXJkT3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnNCdXR0b24udGV4dENvbnRlbnQgPSBcIuKYsFwiO1xuICAgICAgICAgIGRlc2NyaXB0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgbm90ZWNhcmRPcHRpb25zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBub3RlY2FyZEJhY2suYXBwZW5kQ2hpbGQob3B0aW9uc0J1dHRvbik7XG5cbiAgICAgIGNvbnN0IHJlbW92ZU5vdGVjYXJkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIHJlbW92ZU5vdGVjYXJkQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJyZW1vdmUtbm90ZWNhcmQtYnV0dG9uXCIpO1xuICAgICAgcmVtb3ZlTm90ZWNhcmRCdXR0b24udGV4dENvbnRlbnQgPSBcIlJlbW92ZVwiO1xuICAgICAgcmVtb3ZlTm90ZWNhcmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIG5vdGVjYXJkU3RvcmFnZS5yZW1vdmVOb3RlY2FyZChjYXJkKTtcbiAgICAgICAgbm90ZWNhcmRDb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgIHRhZ1N0b3JhZ2UucmVtb3ZlVW51c2VkVGFncygpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgICAgcmVmcmVzaFRhZ3ModGFnU3RvcmFnZS5nZXRUYWdzKCkpO1xuICAgICAgICBzdG9yZXIuc3RvcmUoKTtcbiAgICAgIH0pO1xuICAgICAgbm90ZWNhcmRPcHRpb25zLmFwcGVuZENoaWxkKHJlbW92ZU5vdGVjYXJkQnV0dG9uKTtcblxuICAgICAgbm90ZWNhcmRCYWNrLmFwcGVuZENoaWxkKG5vdGVjYXJkT3B0aW9ucyk7XG4gICAgICBub3RlY2FyZElubmVyLmFwcGVuZENoaWxkKG5vdGVjYXJkQmFjayk7XG5cbiAgICAgIG5vdGVjYXJkSW5uZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZmxpcHBlci5mbGlwKG5vdGVjYXJkSW5uZXIuY2xhc3NMaXN0KTtcbiAgICAgIH0pO1xuXG4gICAgICBub3RlY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChub3RlY2FyZElubmVyKTtcbiAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobm90ZWNhcmRDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaEJvZHkoKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVwYWdlXCIpXG4gICAgICAucmVwbGFjZUNoaWxkKFxuICAgICAgICBnZW5lcmF0ZUJvZHkobm90ZWNhcmRGaWx0ZXJlci5maWx0ZXIoKSksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9keVwiKVxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlVGFncyh0YWdMaXN0KSB7XG4gICAgY29uc3QgdGFncyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFncy5jbGFzc0xpc3QuYWRkKFwidGFnc1wiKTtcblxuICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ0xpc3QpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSB0YWc7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcInRhZy1zZWxlY3RlZFwiKSkge1xuICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwidGFnLXNlbGVjdGVkXCIpO1xuICAgICAgICB9IGVsc2UgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJ0YWctc2VsZWN0ZWRcIik7XG5cbiAgICAgICAgcmVmcmVzaEJvZHkoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0YWdzLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhZ3M7XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoVGFncyh0YWdMaXN0KSB7XG4gICAgaWYgKHRhZ0xpc3QgPT09IFwibm9uZVwiKSB7XG4gICAgICBkb2N1bWVudFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5ob21lcGFnZVwiKVxuICAgICAgICAucmVwbGFjZUNoaWxkKFxuICAgICAgICAgIGdlbmVyYXRlVGFncyh0YWdTdG9yYWdlLmdldFRhZ3MoKSksXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWdzXCIpXG4gICAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVwYWdlXCIpXG4gICAgICAgIC5yZXBsYWNlQ2hpbGQoZ2VuZXJhdGVUYWdzKHRhZ0xpc3QpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhZ3NcIikpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbHRlclRhZ3NCeVN1YmplY3Qoc3ViamVjdCkge1xuICAgIGNvbnN0IG5vdGVjYXJkcyA9IG5vdGVjYXJkU3RvcmFnZS5nZXROb3RlY2FyZEJ5U3ViamVjdChzdWJqZWN0KTtcbiAgICBjb25zdCB0YWdMaXN0ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNhcmQgb2Ygbm90ZWNhcmRzKSB7XG4gICAgICBmb3IgKGNvbnN0IHRhZyBvZiBjYXJkLnRhZ3MpIHtcbiAgICAgICAgaWYgKCF0YWdMaXN0LmluY2x1ZGVzKHRhZykpIHRhZ0xpc3QucHVzaCh0YWcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YWdMaXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVTaWRlYmFyKHN1YmplY3RMaXN0KSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QuYWRkKFwic2lkZWJhclwiKTtcblxuICAgIGNvbnN0IHN1YmplY3RzTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN1YmplY3RzTGFiZWwuY2xhc3NMaXN0LmFkZChcIi5zdWJqZWN0cy1sYWJlbFwiKTtcbiAgICBzdWJqZWN0c0xhYmVsLnRleHRDb250ZW50ID0gXCJTdWJqZWN0c1wiO1xuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoc3ViamVjdHNMYWJlbCk7XG5cbiAgICBmb3IgKGNvbnN0IHN1YmplY3Qgb2Ygc3ViamVjdExpc3QpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidXR0b24udGV4dENvbnRlbnQgPSBzdWJqZWN0O1xuICAgICAgaWYgKHN1YmplY3QgPT09IFwiZXZlcnl0aGluZ1wiKSBidXR0b24uY2xhc3NMaXN0LmFkZChcInN1YmplY3QtZXZlcnl0aGluZ1wiKTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChidXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3ViamVjdC1zZWxlY3RlZFwiKSkge1xuICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwic3ViamVjdC1zZWxlY3RlZFwiKTtcbiAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViamVjdC1ldmVyeXRoaW5nXCIpXG4gICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChcInN1YmplY3Qtc2VsZWN0ZWRcIik7XG4gICAgICAgICAgcmVmcmVzaEJvZHkoKTtcbiAgICAgICAgICByZWZyZXNoVGFncyh0YWdTdG9yYWdlLmdldFRhZ3MoKSk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXN1YmplY3QtYnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlbW92ZS1zdWJqZWN0LWJ1dHRvblwiKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgICAgIFwibm9uZVwiO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJqZWN0ID09PSBcImV2ZXJ5dGhpbmdcIikge1xuICAgICAgICAgIHJlZnJlc2hUYWdzKHRhZ1N0b3JhZ2UuZ2V0VGFncygpKTtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtc3ViamVjdC1idXR0b25cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVtb3ZlLXN1YmplY3QtYnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgXCJub25lXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVmcmVzaFRhZ3MoZmlsdGVyVGFnc0J5U3ViamVjdChzdWJqZWN0KSk7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXN1YmplY3QtYnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgXCJibG9ja1wiO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVtb3ZlLXN1YmplY3QtYnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgICAgICAgXCJibG9ja1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBzdWIgb2Ygc2lkZWJhci5jaGlsZHJlbikge1xuICAgICAgICAgIHN1Yi5jbGFzc0xpc3QucmVtb3ZlKFwic3ViamVjdC1zZWxlY3RlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcInN1YmplY3Qtc2VsZWN0ZWRcIik7XG4gICAgICAgIHJlZnJlc2hCb2R5KCk7XG4gICAgICB9KTtcbiAgICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2lkZWJhcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZnJlc2hTaWRlYmFyKHN1YmplY3RMaXN0KSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVwYWdlXCIpXG4gICAgICAucmVwbGFjZUNoaWxkKFxuICAgICAgICBnZW5lcmF0ZVNpZGViYXIoc3ViamVjdExpc3QpLFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJcIilcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW5lcmF0ZUZvb3RlcigpIHtcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvb3Rlci5jbGFzc0xpc3QuYWRkKFwiZm9vdGVyXCIpO1xuICAgIGZvb3Rlci50ZXh0Q29udGVudCA9IFwiTWFkZSBieTogV2lsbCBNb3JldHpcIjtcbiAgICByZXR1cm4gZm9vdGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIb21lUGFnZShzdWJqZWN0TGlzdCwgdGFnTGlzdCwgbm90ZWNhcmRMaXN0KSB7XG4gICAgY29uc3QgaG9tZVBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGhvbWVQYWdlLmNsYXNzTGlzdC5hZGQoXCJob21lcGFnZVwiKTtcbiAgICBob21lUGFnZS5hcHBlbmRDaGlsZChnZW5lcmF0ZUhlYWRlcigpKTtcbiAgICBob21lUGFnZS5hcHBlbmRDaGlsZChnZW5lcmF0ZVRhZ3ModGFnTGlzdCkpO1xuICAgIGhvbWVQYWdlLmFwcGVuZENoaWxkKGdlbmVyYXRlU2lkZWJhcihzdWJqZWN0TGlzdCkpO1xuICAgIGhvbWVQYWdlLmFwcGVuZENoaWxkKGdlbmVyYXRlQm9keShub3RlY2FyZExpc3QpKTtcbiAgICBob21lUGFnZS5hcHBlbmRDaGlsZChnZW5lcmF0ZUZvb3RlcigpKTtcbiAgICByZXR1cm4gaG9tZVBhZ2U7XG4gIH1cblxuICByZXR1cm4geyBnZW5lcmF0ZUhvbWVQYWdlLCByZWZyZXNoU2lkZWJhciwgcmVmcmVzaEJvZHksIHJlZnJlc2hUYWdzIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBob21lcGFnZTtcbiIsIi8vIG5vdGVjYXJkU3RvcmFnZSBNb2R1bGUgUGF0dGVyblxuLy8gd2lsbCBzdG9yZSBub3RlY2FyZHMgaW4gYW4gYXJyYXkuIFdpbGwgYWRkIGFuZCBkZWxldGUgbm90ZWNhcmRzXG5jb25zdCBub3RlY2FyZFN0b3JhZ2UgPSAoKCkgPT4ge1xuICBjb25zdCBub3RlY2FyZHMgPSBbXTtcblxuICBmdW5jdGlvbiBhZGROb3RlY2FyZChub3RlY2FyZCkge1xuICAgIG5vdGVjYXJkcy5wdXNoKG5vdGVjYXJkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU5vdGVjYXJkKG5vdGVjYXJkKSB7XG4gICAgY29uc3QgaW5kZXggPSBub3RlY2FyZHMuaW5kZXhPZihub3RlY2FyZCk7XG4gICAgbm90ZWNhcmRzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbGxOb3RlY2FyZHMoKSB7XG4gICAgcmV0dXJuIG5vdGVjYXJkcztcbiAgfVxuXG4gIC8vIHJldHVybnMgYW4gYXJyYXkgb2YgaXRlbXMgdGhhdCBoYXZlIGFsbCBtYXRjaGluZyB0YWdzXG4gIGZ1bmN0aW9uIGdldE5vdGVjYXJkQnlUYWdzKHRhZ3MpIHtcbiAgICBpZiAodGFncy5sZW5ndGggPT09IDApIHJldHVybiBnZXRBbGxOb3RlY2FyZHMoKTtcbiAgICByZXR1cm4gbm90ZWNhcmRzLmZpbHRlcigobm90ZWNhcmQpID0+IHtcbiAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICAgICAgaWYgKG5vdGVjYXJkLnRhZ3MuaW5jbHVkZXModGFnKSkgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZXR1cm5zIGFuIGFycmF5IG9mIGl0ZW1zIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb2plY3RcbiAgZnVuY3Rpb24gZ2V0Tm90ZWNhcmRCeVN1YmplY3Qoc3ViamVjdCkge1xuICAgIHJldHVybiBub3RlY2FyZHMuZmlsdGVyKChub3RlY2FyZCkgPT4gbm90ZWNhcmQuc3ViamVjdCA9PT0gc3ViamVjdCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZE5vdGVjYXJkLFxuICAgIHJlbW92ZU5vdGVjYXJkLFxuICAgIGdldE5vdGVjYXJkQnlUYWdzLFxuICAgIGdldE5vdGVjYXJkQnlTdWJqZWN0LFxuICAgIGdldEFsbE5vdGVjYXJkcyxcbiAgfTtcbn0pKCk7XG5cbi8vIG5vdGVjYXJkIGZhY3RvcnkgZnVuY3Rpb25cbi8vIHJldHVybnMgYSBuZXcgbm90ZWNhcmRcbmNvbnN0IG5vdGVjYXJkID0gKHRpdGxlLCB0YWdzLCBjb250ZW50LCBzdWJqZWN0KSA9PiAoe1xuICB0aXRsZSxcbiAgdGFncyxcbiAgY29udGVudCxcbiAgc3ViamVjdCxcbn0pO1xuXG4vLyBzdWJqZWN0U3RvcmFnZSBNb2R1bGUgUGF0dGVyblxuLy8gd2lsbCBzdG9yZSBzdWJqZWN0cy4gV2lsbCBhZGQgYW5kIGRlbGV0ZSBzdWJqZWN0c1xuY29uc3Qgc3ViamVjdFN0b3JhZ2UgPSAoKCkgPT4ge1xuICBjb25zdCBzdWJqZWN0cyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFkZFN1YmplY3Qoc3ViamVjdCkge1xuICAgIHN1YmplY3RzLnB1c2goc3ViamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVTdWJqZWN0KHN1YmplY3QpIHtcbiAgICBjb25zdCBpbmRleCA9IHN1YmplY3RzLmluZGV4T2Yoc3ViamVjdCk7XG4gICAgc3ViamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN1YmplY3RzKCkge1xuICAgIHJldHVybiBzdWJqZWN0cztcbiAgfVxuXG4gIHJldHVybiB7IGFkZFN1YmplY3QsIHJlbW92ZVN1YmplY3QsIGdldFN1YmplY3RzIH07XG59KSgpO1xuXG4vLyB0YWdTdG9yYWdlIE1vZHVsZSBQYXR0ZXJuXG4vLyB3aWxsIHN0b3JlIHRhZ3MuIFdpbGwgYWRkIGFuZCBkZWxldGUgdGFnc1xuY29uc3QgdGFnU3RvcmFnZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHRhZ3MgPSBbXTtcblxuICBmdW5jdGlvbiBhZGRUYWcodGFnKSB7XG4gICAgdGFncy5wdXNoKHRhZyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUYWcodGFnKSB7XG4gICAgY29uc3QgaW5kZXggPSB0YWdzLmluZGV4T2YodGFnKTtcbiAgICB0YWdzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUYWdzKCkge1xuICAgIHJldHVybiB0YWdzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVW51c2VkVGFncygpIHtcbiAgICBjb25zdCB1bnVzZWRUYWdzID0gW107XG4gICAgZm9yIChjb25zdCB0YWcgb2YgZ2V0VGFncygpKSB1bnVzZWRUYWdzLnB1c2godGFnKTtcbiAgICBmb3IgKGNvbnN0IGNhcmQgb2Ygbm90ZWNhcmRTdG9yYWdlLmdldEFsbE5vdGVjYXJkcygpKSB7XG4gICAgICBmb3IgKGNvbnN0IHRhZyBvZiBjYXJkLnRhZ3MpIHtcbiAgICAgICAgaWYgKHVudXNlZFRhZ3MuaW5jbHVkZXModGFnKSkge1xuICAgICAgICAgIGNvbnN0IHRhZ0luZGV4ID0gdW51c2VkVGFncy5pbmRleE9mKHRhZyk7XG4gICAgICAgICAgdW51c2VkVGFncy5zcGxpY2UodGFnSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdGFnIG9mIHVudXNlZFRhZ3MpIHJlbW92ZVRhZyh0YWcpO1xuICB9XG5cbiAgcmV0dXJuIHsgYWRkVGFnLCByZW1vdmVUYWcsIGdldFRhZ3MsIHJlbW92ZVVudXNlZFRhZ3MgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IG5vdGVjYXJkU3RvcmFnZSwgdGFnU3RvcmFnZSwgc3ViamVjdFN0b3JhZ2UsIG5vdGVjYXJkIH07XG4iLCJpbXBvcnQgeyBub3RlY2FyZFN0b3JhZ2UsIHRhZ1N0b3JhZ2UsIHN1YmplY3RTdG9yYWdlIH0gZnJvbSBcIi4vbm90ZWNhcmRzXCI7XG5cbmNvbnN0IHN0b3JlciA9ICgoKSA9PiB7XG4gIGZ1bmN0aW9uIHN0b3JlTm90ZWNhcmRzKCkge1xuICAgIGNvbnN0IG5vdGVjYXJkTGlzdCA9IG5vdGVjYXJkU3RvcmFnZS5nZXRBbGxOb3RlY2FyZHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVjYXJkTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2FyZCA9IEpTT04uc3RyaW5naWZ5KG5vdGVjYXJkTGlzdFtpXSk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgbm90ZWNhcmQke2l9YCwgY2FyZCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcmVTdWJqZWN0cygpIHtcbiAgICBjb25zdCBzdWJqZWN0TGlzdCA9IHN1YmplY3RTdG9yYWdlLmdldFN1YmplY3RzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJqZWN0TGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYHN1YmplY3Qke2l9YCwgc3ViamVjdExpc3RbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlVGFncygpIHtcbiAgICBjb25zdCB0YWdMaXN0ID0gdGFnU3RvcmFnZS5nZXRUYWdzKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdMaXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShgdGFnJHtpfWAsIHRhZ0xpc3RbaV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlKCkge1xuICAgIGNvbnN0IHZpc2l0U3RhdHVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJmaXJzdFZpc2l0XCIpO1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZmlyc3RWaXNpdFwiLCB2aXNpdFN0YXR1cyk7XG4gICAgc3RvcmVUYWdzKCk7XG4gICAgc3RvcmVTdWJqZWN0cygpO1xuICAgIHN0b3JlTm90ZWNhcmRzKCk7XG4gIH1cblxuICByZXR1cm4geyBzdG9yZSB9O1xufSkoKTtcblxuY29uc3QgcmVzdG9yZXIgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiByZXN0b3JlTm90ZWNhcmRzKCkge1xuICAgIGNvbnN0IG5vdGVjYXJkTGlzdCA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGBub3RlY2FyZCR7aX1gKTtcbiAgICAgIGlmIChpdGVtICE9PSBudWxsKSB7XG4gICAgICAgIG5vdGVjYXJkTGlzdC5wdXNoKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgICAgICBpICs9IDE7XG4gICAgICB9IGVsc2UgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBub3RlY2FyZExpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0b3JlU3ViamVjdHMoKSB7XG4gICAgY29uc3Qgc3ViamVjdExpc3QgPSBbXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShgc3ViamVjdCR7aX1gKTtcbiAgICAgIGlmIChpdGVtICE9PSBudWxsKSB7XG4gICAgICAgIHN1YmplY3RMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgIH0gZWxzZSBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHN1YmplY3RMaXN0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdG9yZVRhZ3MoKSB7XG4gICAgY29uc3QgdGFnTGlzdCA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGB0YWcke2l9YCk7XG4gICAgICBpZiAoaXRlbSAhPT0gbnVsbCkge1xuICAgICAgICB0YWdMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgIH0gZWxzZSBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRhZ0xpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiByZXN0b3JlKCkge1xuICAgIGNvbnN0IHRhZ0xpc3QgPSByZXN0b3JlVGFncygpO1xuICAgIGNvbnN0IHN1YmplY3RMaXN0ID0gcmVzdG9yZVN1YmplY3RzKCk7XG4gICAgY29uc3Qgbm90ZWNhcmRMaXN0ID0gcmVzdG9yZU5vdGVjYXJkcygpO1xuICAgIHJldHVybiB7IHRhZ0xpc3QsIHN1YmplY3RMaXN0LCBub3RlY2FyZExpc3QgfTtcbiAgfVxuXG4gIHJldHVybiB7IHJlc3RvcmUgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IHN0b3JlciwgcmVzdG9yZXIgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGhvbWVwYWdlIGZyb20gXCIuL2hvbWVwYWdlXCI7XG5pbXBvcnQge1xuICBzdWJqZWN0U3RvcmFnZSxcbiAgdGFnU3RvcmFnZSxcbiAgbm90ZWNhcmRTdG9yYWdlLFxuICBub3RlY2FyZCxcbn0gZnJvbSBcIi4vbm90ZWNhcmRzXCI7XG5pbXBvcnQgeyBmb3JtRE9NLCBmb3JtVmFsaWRhdG9yIH0gZnJvbSBcIi4vZm9ybVwiO1xuaW1wb3J0IHsgc3RvcmVyLCByZXN0b3JlciB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuLy8gcGFnZU1hbmFnZXIgbW9kdWxlIHBhdHRlcm5cbi8vIHdpbGwgY2FsbCBET00gZnVuY3Rpb25zIGFuZCBmdW5jdGlvbnMgZGVmaW5lZCBhYm92ZVxuY29uc3QgcGFnZU1hbmFnZXIgPSAoKCkgPT4ge1xuICBjb25zdCBQQUdFQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXG4gIGZ1bmN0aW9uIHJlc2V0UGFnZSgpIHtcbiAgICBQQUdFQ09OVEFJTkVSLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZER1bW15Q29udGVudCgpIHtcbiAgICAvLyBEdW1teSBDb250ZW50XG4gICAgc3ViamVjdFN0b3JhZ2UuYWRkU3ViamVjdChcImV2ZXJ5dGhpbmdcIik7XG4gICAgc3ViamVjdFN0b3JhZ2UuYWRkU3ViamVjdChcImVuZ2xpc2hcIik7XG4gICAgc3ViamVjdFN0b3JhZ2UuYWRkU3ViamVjdChcIm1hdGhcIik7XG4gICAgc3ViamVjdFN0b3JhZ2UuYWRkU3ViamVjdChcInNjaWVuY2VcIik7XG4gICAgc3ViamVjdFN0b3JhZ2UuYWRkU3ViamVjdChcImdlb2dyYXBoeVwiKTtcbiAgICBzdWJqZWN0U3RvcmFnZS5hZGRTdWJqZWN0KFwiaGlzdG9yeVwiKTtcbiAgICB0YWdTdG9yYWdlLmFkZFRhZyhcInRhZzFcIik7XG4gICAgdGFnU3RvcmFnZS5hZGRUYWcoXCJ0YWcyXCIpO1xuICAgIHRhZ1N0b3JhZ2UuYWRkVGFnKFwidGFnM1wiKTtcbiAgICBub3RlY2FyZFN0b3JhZ2UuYWRkTm90ZWNhcmQoXG4gICAgICBub3RlY2FyZChcbiAgICAgICAgXCJ0aXRsZTFcIixcbiAgICAgICAgW1widGFnMVwiLCBcInRhZzJcIiwgXCJ0YWczXCJdLFxuICAgICAgICBcImxvcmVtIGlwc3VtIGJsYWggYmxhaCBibGFoXCIsXG4gICAgICAgIFwiZW5nbGlzaFwiXG4gICAgICApXG4gICAgKTtcbiAgICBub3RlY2FyZFN0b3JhZ2UuYWRkTm90ZWNhcmQoXG4gICAgICBub3RlY2FyZChcbiAgICAgICAgXCJ0aXRsZTJcIixcbiAgICAgICAgW1widGFnMVwiLCBcInRhZzJcIl0sXG4gICAgICAgIFwibG9yZW0gaXBzdW0gYmxhaCBibGFoIGJsYWFhYWFhYWhcIixcbiAgICAgICAgXCJtYXRoXCJcbiAgICAgIClcbiAgICApO1xuICAgIG5vdGVjYXJkU3RvcmFnZS5hZGROb3RlY2FyZChcbiAgICAgIG5vdGVjYXJkKFxuICAgICAgICBcInRpdGxlM1wiLFxuICAgICAgICBbXCJ0YWcxXCIsIFwidGFnMlwiXSxcbiAgICAgICAgXCJsb3JlbSBpcHN1bSBibGFoIGJsYWggYmxhaFwiLFxuICAgICAgICBcInNjaWVuY2VcIlxuICAgICAgKVxuICAgICk7XG4gICAgbm90ZWNhcmRTdG9yYWdlLmFkZE5vdGVjYXJkKFxuICAgICAgbm90ZWNhcmQoXG4gICAgICAgIFwidGl0bGU0XCIsXG4gICAgICAgIFtcInRhZzNcIiwgXCJ0YWc0XCJdLFxuICAgICAgICBcImxvcmVtIGlwc3VtIGJsYWggYmxhaCBibGFoXCIsXG4gICAgICAgIFwic2NpZW5jZVwiXG4gICAgICApXG4gICAgKTtcbiAgICBub3RlY2FyZFN0b3JhZ2UuYWRkTm90ZWNhcmQoXG4gICAgICBub3RlY2FyZChcbiAgICAgICAgXCJ0aXRsZTVcIixcbiAgICAgICAgW1widGFnMlwiLCBcInRhZzNcIl0sXG4gICAgICAgIFwibG9yZW0gaXBzdW0gYmxhaCBibGFoIGJsYWhcIixcbiAgICAgICAgXCJoaXN0b3J5XCJcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdEhvbWVwYWdlKCkge1xuICAgIC8vIHJldHJpZXZlIGFueSBzYXZlZCBub3RlY2FyZHMgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgY29uc3Qgc3RvcmVkVmFsdWVzID0gcmVzdG9yZXIucmVzdG9yZSgpO1xuICAgIC8vIGFkZCByZXRyaWV2ZWQgY29udGVudFxuICAgIGZvciAoY29uc3Qgc3ViamVjdCBvZiBzdG9yZWRWYWx1ZXMuc3ViamVjdExpc3QpIHtcbiAgICAgIHN1YmplY3RTdG9yYWdlLmFkZFN1YmplY3Qoc3ViamVjdCk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0YWcgb2Ygc3RvcmVkVmFsdWVzLnRhZ0xpc3QpIHtcbiAgICAgIHRhZ1N0b3JhZ2UuYWRkVGFnKHRhZyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIHN0b3JlZFZhbHVlcy5ub3RlY2FyZExpc3QpIHtcbiAgICAgIG5vdGVjYXJkU3RvcmFnZS5hZGROb3RlY2FyZChjYXJkKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZHVtbXkgY29udGVudCBpZiBpdHMgdGhlIGZpcnN0IHZpc2l0XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZmlyc3RWaXNpdFwiKSA9PT0gbnVsbCkge1xuICAgICAgYWRkRHVtbXlDb250ZW50KCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImZpcnN0VmlzaXRcIiwgZmFsc2UpO1xuICAgICAgc3RvcmVyLnN0b3JlKCk7XG4gICAgfVxuXG4gICAgcmVzZXRQYWdlKCk7XG4gICAgUEFHRUNPTlRBSU5FUi5hcHBlbmRDaGlsZChcbiAgICAgIGhvbWVwYWdlLmdlbmVyYXRlSG9tZVBhZ2UoXG4gICAgICAgIHN1YmplY3RTdG9yYWdlLmdldFN1YmplY3RzKCksXG4gICAgICAgIHRhZ1N0b3JhZ2UuZ2V0VGFncygpLFxuICAgICAgICBub3RlY2FyZFN0b3JhZ2UuZ2V0QWxsTm90ZWNhcmRzKClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0SG9tZXBhZ2UsXG4gIH07XG59KSgpO1xuXG5wYWdlTWFuYWdlci5pbml0SG9tZXBhZ2UoKTtcblxuLy8gRXZlbnQgTGlzdGVuZXJzIHRoYXQgd2lsbCBpbnRlcmZhY2Ugd2l0aCBwYWdlTWFuYWdlclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcC11cFwiKTtcbiAgaWYgKGZvcm0uaWQgPT09IGZvcm1WYWxpZGF0b3Iuc3ViamVjdEZvcm1JRCkge1xuICAgIGlmIChmb3JtVmFsaWRhdG9yLnZhbGlkYXRlU3ViamVjdEZvcm0oKSkge1xuICAgICAgaG9tZXBhZ2UucmVmcmVzaFNpZGViYXIoc3ViamVjdFN0b3JhZ2UuZ2V0U3ViamVjdHMoKSk7XG4gICAgICBmb3JtRE9NLnJlbW92ZUZvcm0oZm9ybSk7XG4gICAgICBzdG9yZXIuc3RvcmUoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybS5pZCA9PT0gZm9ybVZhbGlkYXRvci5ub3RlY2FyZEZvcm1JRCkge1xuICAgIGlmIChmb3JtVmFsaWRhdG9yLnZhbGlkYXRlTm90ZWNhcmRGb3JtKCkpIHtcbiAgICAgIGhvbWVwYWdlLnJlZnJlc2hCb2R5KG5vdGVjYXJkU3RvcmFnZS5nZXRBbGxOb3RlY2FyZHMoKSk7XG4gICAgICBob21lcGFnZS5yZWZyZXNoVGFncyh0YWdTdG9yYWdlLmdldFRhZ3MoKSk7XG4gICAgICBmb3JtRE9NLnJlbW92ZUZvcm0oZm9ybSk7XG4gICAgICBzdG9yZXIuc3RvcmUoKTtcbiAgICB9XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9