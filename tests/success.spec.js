// @ts-check
import { expect, test } from "@playwright/test";

test("success page redirects after 5 seconds", async ({ page }) => {
  await page.goto("http://localhost:5173/success"); // Adjust the URL if necessary

  // Wait for 5 seconds (5000 milliseconds)
  await page.waitForTimeout(5000);

  // Assert that the page is redirected to the home page
  await expect(page).toHaveURL("http://localhost:5173/"); // Adjust the URL if necessary
});

test("success page displays success message", async ({ page }) => {
  await page.goto("http://localhost:5173/success"); // Adjust the URL if necessary

  // Assert that the success message is displayed
  await expect(page.locator("h2.text-green-400")).toContainText(
    "Payment Success!"
  );
});

test("success page displays redirecting message", async ({ page }) => {
  await page.goto("http://localhost:5173/success"); // Adjust the URL if necessary

  // Assert that the redirecting message is displayed
  await expect(page.locator("p.text-orange-400")).toContainText(
    "Redirecting back to HomeScreen..."
  );
});

test("success page displays eSewa header", async ({ page }) => {
  await page.goto("http://localhost:5173/success"); // Adjust the URL if necessary

  // Assert that the eSewa header is displayed
  await expect(page.locator(".text-3xl.font-bold")).toContainText("eSewa");

  // Assert that the eSewa icon is displayed (optional)
  const image = page.locator('img[alt="eSewa Icon"]');
  await expect(image).toBeVisible();
});
