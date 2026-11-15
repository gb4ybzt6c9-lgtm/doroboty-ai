import { test, expect, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { STORAGE_KEY } from "../../src/features/prototype/storage";

async function choose(page: Page, name: string) {
  await page.goto("/#/auth/sign-in");
  await page.getByRole("button", { name: `Wejdź jako ${name}`, exact: true }).click();
}
const demoNotice = "Wersja demonstracyjna. Wszystkie oferty i firmy są przykładowe.";

for (const width of [1440, 390]) {
  test(`public pages say the offers are examples and are not indexed at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/#/", "/#/oferty/ai-product-manager"]) {
      await page.goto(route);
      await expect(page.getByRole("contentinfo")).toContainText(demoNotice);
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
}

test("a stale tab stops saving after another tab changes the scenario", async ({ context }) => {
  const first = await context.newPage();
  await choose(first, "Anna Kowalska");
  await first.goto("/#/app/profil");
  const second = await context.newPage();
  await second.goto("/#/app/profil");
  await second.getByLabel("Imię i nazwisko").fill("Anna z drugiej karty");
  await second.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  await expect(first.getByRole("status")).toContainText("zmieniono w innej karcie");
  await first.getByLabel("Imię i nazwisko").fill("Anna ze starej karty");
  await first.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  const saved = await first.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
  expect(saved.people.find((p: { id: string }) => p.id === "candidate-anna").name).toBe(
    "Anna z drugiej karty",
  );
  await first.reload();
  await expect(first.getByLabel("Imię i nazwisko")).toHaveValue("Anna z drugiej karty");
  await expect(first.getByRole("status")).toHaveCount(0);
});

test("a screen error shows recovery actions instead of a blank page", async ({ page }) => {
  await page.addInitScript(() => {
    for (const proto of [Intl.NumberFormat.prototype, Intl.DateTimeFormat.prototype]) {
      const original = Object.getOwnPropertyDescriptor(proto, "format")!;
      Object.defineProperty(proto, "format", {
        configurable: true,
        get() {
          if ((window as unknown as { breakFormat?: boolean }).breakFormat)
            throw new Error("Simulated render failure");
          return original.get!.call(this);
        },
      });
    }
  });
  await page.goto("/#/metodologia");
  await page.evaluate(() => ((window as unknown as { breakFormat: boolean }).breakFormat = true));
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Oferty", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Ten ekran nie mógł się wyświetlić" }),
  ).toBeVisible();
  await expect(page.getByRole("contentinfo")).toContainText(demoNotice);
  await expect(page.getByRole("link", { name: "Ustawienia danych" }).last()).toBeVisible();
  await page.getByRole("button", { name: "Odśwież stronę" }).click();
  await expect(
    page.getByRole("heading", { name: "Ten ekran nie mógł się wyświetlić" }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: "AI Product Manager" }).first()).toBeVisible();
});

test("an exported scenario restores into a fresh browser", async ({ browser, page }) => {
  await choose(page, "Anna Kowalska");
  await page.goto("/#/app/profil");
  await page.getByLabel("Imię i nazwisko").fill("Anna z kopii");
  await page.getByRole("button", { name: "Zapisz profil", exact: true }).click();
  await page.goto("/#/app/settings");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Eksportuj dane" }).click();
  const file = await (await download).path();
  const fresh = await browser.newContext({ baseURL: "http://127.0.0.1:3106" });
  const restored = await fresh.newPage();
  await restored.goto("/#/app/settings");
  await restored.getByLabel("Importuj plik scenariusza").setInputFiles({
    name: "doroboty-scenariusz.json",
    mimeType: "application/json",
    buffer: await readFile(file),
  });
  await restored.getByRole("button", { name: "Importuj", exact: true }).click();
  await expect(restored.getByText("Anna z kopii", { exact: true }).first()).toBeVisible();
  await fresh.close();
});
