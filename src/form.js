const formDOM = (() => {
  function generateOverlay() {
    const overlay = document.createElement("div");
    overlay.classList.add("pop-up-overlay");
    overlay.classList.add("pop-up-active"); // change to inactive by default

    return overlay;
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
    subjectLabel.textContent = "Subject";
    formItem.appendChild(subjectLabel);

    const subjectInput = document.createElement("input");
    subjectInput.setAttribute("type", "text");
    subjectInput.setAttribute("id", "subject");
    subjectInput.setAttribute("name", "subject");
    formItem.appendChild(subjectInput);
    formRow1.appendChild(formItem);
    form.appendChild(formRow1);

    const formRow2 = document.createElement("div");
    formRow2.classList.add("form-row");

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "submit";
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
    formRow2.appendChild(submitButton);
    form.appendChild(formRow2);

    return form;
  }

  return { generateNotecardForm, generateSubjectForm, generateOverlay };
})();

export default formDOM;
