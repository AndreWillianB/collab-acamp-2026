const form = document.querySelector("#form-inscricao");
const birthDateInput = document.querySelector("#idade");
const responsibleSection = document.querySelector("#form-responsavel");

function calculateAge(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);

  const today = new Date();
  let age = today.getFullYear() - year;

  const hasNotHadBirthdayYet =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);

  if (hasNotHadBirthdayYet) {
    age--;
  }

  return age;
}

function updateResponsibleSection() {
  if (!birthDateInput.value) {
    responsibleSection.hidden = true;
    responsibleSection.disabled = true;
    return;
  }

  const isMinor = calculateAge(birthDateInput.value) < 18;

  responsibleSection.hidden = !isMinor;
  responsibleSection.disabled = !isMinor;
}

birthDateInput.addEventListener("change", updateResponsibleSection);

updateResponsibleSection();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  updateResponsibleSection();

  if (!form.reportValidity()) {
    return;
  }

  const formData = new FormData(form);

  const registrationSummary = {
    nome: formData.get("nome") || "",
    email: formData.get("email") || "",
    telefone: formData.get("telefone") || "",
    idade: formData.get("idade") || "",
    nomeResponsavel: formData.get("nomeResponsavel") || "",
    emailResponsavel: formData.get("emailResponsavel") || "",
    telefoneResponsavel: formData.get("telefoneResponsavel") || "",
    is_minor: !responsibleSection.disabled
  };

  sessionStorage.setItem(
    "event-registration-summary",
    JSON.stringify(registrationSummary)
  );

  window.location.href = "./checkout.html";
});