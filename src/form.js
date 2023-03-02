import { subjectStorage } from "./notecards";

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

  function generateNotecardForm() {
    const form = document.createElement("form");
    form.textContent = "hello form";
    return form;
  }

  function generateSubjectForm() {
    const form = document.createElement("form");
    form.classList.add("pop-up");
    form.classList.add("pop-up-active"); // change to inactive by default

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

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (subjectInput.value.length > 14) {
        subjectInputErrorMessage.textContent =
          "Input must be less than 14 characters";
      } else if (subjectInput.value.length === 0) {
        subjectInputErrorMessage.textContent = "Please enter a subject";
      } else {
        subjectStorage.addSubject(subjectInput.value);
        toggleDisplay(form);
      }
    });
    formRow2.appendChild(submitButton);
    form.appendChild(formRow2);

    form.appendChild(generateCloseButton(form));

    return form;
  }

  return { generateNotecardForm, generateSubjectForm, generateOverlay };
})();

export default formDOM;
