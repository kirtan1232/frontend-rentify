// @ts-check
import { expect, test } from "@playwright/test";

test("admin dashboard displays all rooms", async ({ page }) => {
  await page.goto("http://localhost:5173/adminDash"); // Adjust the URL if necessary

  // Wait for the flats to load (adjust timeout if needed)
  await page.waitForSelector("table tbody tr", { timeout: 10000 });

  // Assert that at least one room is displayed in the table
  const rowCount = await page.locator("table tbody tr").count();
  expect(rowCount).toBeGreaterThan(0);

  // Optional: Assert specific details of a room
  // Example: Check the room description of the first room
  const firstRoomDescription = await page
    .locator("table tbody tr:first-child td:nth-child(2)")
    .textContent();
  expect(firstRoomDescription).not.toBeNull(); // Or check for a specific value
});

test("admin dashboard navigates to dashboard", async ({ page }) => {
  await page.goto("http://localhost:5173/adminDash"); // Adjust the URL if necessary

  // Click the "Dashboard" button
  await page.locator('button:has-text("Dashboard")').click();

  // Wait for navigation to complete
  await page.waitForURL("http://localhost:5173/"); // Adjust the URL if necessary

  // Assert that the page is redirected to the dashboard
  await expect(page).toHaveURL("http://localhost:5173/"); // Adjust the URL if necessary
});

test("admin dashboard navigates to customer details", async ({ page }) => {
  await page.goto("http://localhost:5173/adminDash"); // Adjust the URL if necessary

  // Click the "Customer Details" button
  await page.locator('button:has-text("Customer Details")').click();

  // Wait for navigation to complete
  await page.waitForURL("http://localhost:5173/profile"); // Adjust the URL if necessary

  // Assert that the page is redirected to the customer details page
  await expect(page).toHaveURL("http://localhost:5173/profile"); // Adjust the URL if necessary
});

test("admin dashboard logs out", async ({ page }) => {
  await page.goto("http://localhost:5173/adminDash"); // Adjust the URL if necessary

  // Click the "Logout" button
  await page.locator('button:has-text("Logout")').click();

  // Wait for navigation to complete (usually redirects to the home page or login page)
  await page.waitForURL("http://localhost:5173/"); // Adjust the URL if necessary

  // Assert that the page is redirected to the home page or login page
  await expect(page).toHaveURL("http://localhost:5173/"); // Adjust the URL if necessary

  // Optional: Assert that the user is logged out (e.g., check for the absence of user-specific elements)
  // Example: Check if the login button is visible
  // await expect(page.locator('a:has-text("Login")')).toBeVisible();
});
