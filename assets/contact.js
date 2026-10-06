"use strict";

// Simulation locale : aucun fetch, stockage ou service d'envoi.
const form = document.querySelector("#contact-form");
const fields = document.querySelector("#contact-fields");
const message = document.querySelector("#contact-message");
const counter = document.querySelector("#message-count");
const status = document.querySelector("#form-status");
const availability = document.querySelector("#form-availability");

const updateCounter = () => {
  counter.textContent = `${message.value.length.toLocaleString("fr-FR")} / 1 500`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Simulation réussie ! Aucun message n’a été envoyé ni enregistré. Merci de tester cette maquette avec des données fictives.";
});

form.addEventListener("input", () => {
  status.textContent = "";
  updateCounter();
});

form.addEventListener("reset", () => {
  status.textContent = "";
  // Attendre la remise à zéro native, exécutée après l’événement reset.
  setTimeout(updateCounter, 0);
});

// Activer le formulaire seulement une fois l'interception d'envoi installée.
fields.disabled = false;
availability.hidden = true;
updateCounter();
