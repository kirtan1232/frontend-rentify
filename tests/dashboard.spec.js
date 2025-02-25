// @ts-check
import { expect, test } from "@playwright/test";



test("dashboard searches for Kathmandu", async ({ page }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Type "Kathmandu" in the search bar
  await page.locator('input[type="text"]').fill("Kathmandu");

  // Wait for the search results to update (adjust timeout if needed)
  await page.waitForTimeout(1000); // Adjust timeout as needed

  // Assert that the search results are displayed (you might need to adjust the selector based on your search results display)
  // Example: Check if at least one search result is displayed
  const searchResultsCount = await page.locator(".grid.grid-cols-1").count();
  expect(searchResultsCount).toBeGreaterThan(0);
});

test("dashboard opens WhatsApp", async ({ page, context }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Trigger the click and wait for the new page promise
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for a new page to open
    page.locator('a[href^="https://wa.me/"]').click(), // Click the WhatsApp link
  ]);

  // Wait for the new page to load (adjust timeout if needed)
  await newPage.waitForLoadState();

  // Assert that the new page URL starts with "https://web.whatsapp.com/" or "https://api.whatsapp.com/"
  const newPageURL = newPage.url();
  expect(newPageURL).toContain("https://web.whatsapp.com/");
  // expect(newPageURL).toContain("https://api.whatsapp.com/"); //This is for mobile
});

test("dashboard scrolls up and down", async ({ page }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Scroll down
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait for a short time to allow scrolling to complete
  await page.waitForTimeout(500);

  // Scroll up
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  // Wait for a short time to allow scrolling to complete
  await page.waitForTimeout(500);

  // You can add more specific assertions here to check if elements are visible after scrolling
  // For example, you can check if the footer is visible after scrolling down
  // Or you can check if the navbar is visible after scrolling up
});



test("dashboard navigates to Kathmandu address page", async ({ page }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Click the Kathmandu icon
  await page.locator('a[href="/address/Kathmandu"]').click();

  // Wait for navigation to complete
  await page.waitForURL("http://localhost:5173/address/Kathmandu"); // Adjust the URL if necessary

  // Assert that the page is redirected to the Kathmandu address page
  await expect(page).toHaveURL("http://localhost:5173/address/Kathmandu"); // Adjust the URL if necessary
});

test("dashboard navigates to Lalitpur address page", async ({ page }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Click the Lalitpur icon
  await page.locator('a[href="/address/Lalitpur"]').click();

  // Wait for navigation to complete
  await page.waitForURL("http://localhost:5173/address/Lalitpur"); // Adjust the URL if necessary

  // Assert that the page is redirected to the Lalitpur address page
  await expect(page).toHaveURL("http://localhost:5173/address/Lalitpur"); // Adjust the URL if necessary
});

test("dashboard navigates to Bhaktapur address page", async ({ page }) => {
  await page.goto("http://localhost:5173/"); // Adjust the URL if necessary

  // Click the Bhaktapur icon
  await page.locator('a[href="/address/Bhaktapur"]').click();

  // Wait for navigation to complete
  await page.waitForURL("http://localhost:5173/address/Bhaktapur"); // Adjust the URL if necessary

  // Assert that the page is redirected to the Bhaktapur address page
  await expect(page).toHaveURL("http://localhost:5173/address/Bhaktapur"); // Adjust the URL if necessary
});
