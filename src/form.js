const form = (() => {
  function generateForm() {
    const form = document.createElement("form");
    form.textContent = "hello form";
    return form;
  }

  return { generateForm };
})();

export default form;
