const storageKey = "event-registration-summary";
const storedSummary = sessionStorage.getItem(storageKey);

if (!storedSummary) {
  window.location.href = "./inscricao.html";
} else {
  const summary = JSON.parse(storedSummary);

  function displayValue(fieldName, value) {
    const element = document.querySelector(
      `[data-summary="${fieldName}"]`
    );

    if (element) {
      element.textContent = value || "Não informado";
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "Não informado";
    }

    const [year, month, day] = dateValue.split("-").map(Number);

    return new Intl.DateTimeFormat("pt-BR").format(
      new Date(year, month - 1, day)
    );
  }

  displayValue("nome", summary.nome);
  displayValue("email", summary.email);
  displayValue("telefone", summary.telefone);
  displayValue("idade", formatDate(summary.idade));

  const responsibleSummary = document.querySelector("#responsible-summary");

  if (summary.is_minor) {
    responsibleSummary.hidden = false;

    displayValue("nomeResponsavel", summary.nomeResponsavel);
    displayValue("emailResponsavel", summary.emailResponsavel);
    displayValue("telefoneResponsavel", summary.telefoneResponsavel);
  }
}