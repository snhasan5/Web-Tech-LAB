const form = document.getElementById("registration-form");
const toast = document.getElementById("toast");

const patterns = {
  name: /^[A-Za-z][A-Za-z\s'.-]{1,58}[A-Za-z.]?$/,
  regno: /^[A-Za-z0-9]{6,12}$/,
  phone: /^\d{10}$/,
  email: /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/
};

const messages = {
  name: "Enter 2-60 characters; letters, spaces, and .' - only.",
  regno: "Use 6-12 characters; letters and numbers only.",
  phone: "Enter a 10-digit mobile number.",
  email: "Enter a valid email address."
};

const getValue = (id) => form.querySelector(`#${id}`).value.trim();

const setError = (id, message) => {
  const input = form.querySelector(`#${id}`);
  const errorEl = form.querySelector(`[data-error="${id}"]`);
  if (input && errorEl) {
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
  }
};

const clearError = (id) => {
  const input = form.querySelector(`#${id}`);
  const errorEl = form.querySelector(`[data-error="${id}"]`);
  if (input && errorEl) {
    input.removeAttribute("aria-invalid");
    errorEl.textContent = "";
  }
};

const validateField = (id) => {
  const value = getValue(id);
  const rule = patterns[id];
  if (!value) {
    setError(id, "This field is required.");
    return false;
  }
  if (rule && !rule.test(value)) {
    setError(id, messages[id]);
    return false;
  }
  clearError(id);
  return true;
};

const showToast = (text) => {
  const textNode = toast.querySelector(".toast-text");
  if (textNode) textNode.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = ["name", "regno", "phone", "email"];
  const results = fields.map(validateField);
  const isValid = results.every(Boolean);
  if (isValid) {
    showToast("Registration submitted successfully.");
    form.reset();
    fields.forEach(clearError);
  }
});

form.addEventListener("reset", () => {
  ["name", "regno", "phone", "email"].forEach(clearError);
  toast.classList.remove("show");
});
