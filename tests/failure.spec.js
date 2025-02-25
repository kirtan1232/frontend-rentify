// @ts-check
import { expect, test } from "@playwright/test";

test("failure page redirects after 5 seconds", async ({ page }) => {
  await page.goto("http://localhost:5173/failure"); // Adjust the URL if necessary

  // Wait for 5 seconds (5000 milliseconds)
  await page.waitForTimeout(5000);

  // Assert that the page is redirected to the home page
  await expect(page).toHaveURL("http://localhost:5173/"); // Adjust the URL if necessary
});

test("failure page displays failure message", async ({ page }) => {
  await page.goto("http://localhost:5173/failure"); // Adjust the URL if necessary

  // Assert that the failure message is displayed
  await expect(page.locator("h2.text-red-400")).toContainText(
    "Payment Failed! Please Try Again."
  );
});

test("failure page displays redirecting message", async ({ page }) => {
  await page.goto("http://localhost:5173/failure"); // Adjust the URL if necessary

  // Assert that the redirecting message is displayed
  await expect(page.locator("p.text-orange-400")).toContainText(
    "Redirecting back to HomeScreen..."
  );
});

test("failure page displays eSewa header", async ({ page }) => {
  await page.goto("http://localhost:5173/failure"); // Adjust the URL if necessary

  // Assert that the eSewa header is displayed
  await expect(page.locator(".text-3xl.font-bold")).toContainText("eSewa");

  // Assert that the eSewa icon is displayed (optional)
  const image = page.locator('img[alt="eSewa Icon"]');
  await expect(image).toBeVisible();
});
