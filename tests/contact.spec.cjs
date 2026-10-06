const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

for (const width of [320, 390, 768, 1280]) {
  test(`Contact : affichage et accessibilité à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto("/contact.html");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Envoyer le message" })).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations).toEqual([]);
    await page.screenshot({ path: `artifacts/contact-${width}.png`, fullPage: true });
  });
}

test("Les champs obligatoires et l’e-mail invalide empêchent la simulation", async ({ page }) => {
  await page.goto("/contact.html");
  const send = page.getByRole("button", { name: "Envoyer le message" });
  await send.click();
  await expect(page.getByRole("status")).toBeEmpty();
  await expect(page.locator("#contact-name")).toBeFocused();
  await page.getByLabel("Votre nom").fill("Camille Exemple");
  await page.getByLabel("Votre e-mail").fill("adresse-invalide");
  await page.getByLabel("Votre message").fill("Bonjour, ceci est un message fictif.");
  await send.click();
  await expect(page.getByRole("status")).toBeEmpty();
  await expect(page.locator("#contact-email")).toBeFocused();
});

test("Une saisie valide confirme la simulation sans requête ni stockage", async ({ page }) => {
  await page.goto("/contact.html");
  await page.getByLabel("Votre nom").fill("Camille Exemple");
  await page.getByLabel("Votre e-mail").fill("camille@example.com");
  await page.getByLabel("Votre message").fill("Bonjour, ceci est un message fictif.");
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.getByRole("button", { name: "Envoyer le message" }).click();
  await expect(page.getByRole("status")).toContainText("Simulation réussie");
  await expect(page.getByRole("status")).toContainText("Aucun message n’a été envoyé ni enregistré");
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(new URL(page.url()).search).toBe("");
  await expect(page.locator("#message-count")).toHaveText("36 / 1 500");
  await page.getByRole("button", { name: "Effacer", exact: true }).click();
  await expect(page.getByLabel("Votre nom")).toHaveValue("");
  await expect(page.getByLabel("Votre e-mail")).toHaveValue("");
  await expect(page.getByLabel("Votre message")).toHaveValue("");
  await expect(page.getByRole("status")).toBeEmpty();
  await expect(page.locator("#message-count")).toHaveText("0 / 1 500");
});

test("Navigation explicite et accès au clavier", async ({ page }) => {
  await page.goto("/contact.html");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Aller au contenu" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenu$/);
  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  for (const [name, href] of [["Accueil", "index.html"], ["Services", "services.html"], ["Contact", "contact.html"], ["Espace collaborateurs", "connexion.html"]]) {
    await expect(nav.getByRole("link", { name })).toHaveAttribute("href", href);
  }
  await expect(nav.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("aria-current", "page");
});

test("Sans JavaScript, aucun envoi de formulaire n’est possible", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/contact.html");
  await expect(page.getByRole("button", { name: "Envoyer le message" })).toBeDisabled();
  await expect(page.getByLabel("Votre nom")).toBeDisabled();
  await expect(page.locator("#form-availability")).toBeVisible();
  await context.close();
});

test("Le mode de mouvement réduit désactive les transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/contact.html");
  expect(await page.locator(".button-primary").evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");
});
