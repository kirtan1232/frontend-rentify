// @ts-check
import { expect, test } from "@playwright/test";

test("login with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/login"); // Adjust the URL if necessary

  // Fill in the login form
  await page.locator('input[type="email"]').fill("shresthakirtan4@gmail.com"); // Replace with a valid email
  await page.locator('input[type="password"]').fill("1234"); // Replace with a valid password

  // Click the login button
  await page.locator('button[type="submit"]').click();

  // Wait for navigation or a specific element to appear after successful login
  await page.waitForURL("http://localhost:5173/"); // Adjust the URL if necessary

  // Assert that the user is redirected to the home page or a logged-in state
  await expect(page).toHaveURL("http://localhost:5173/"); // Adjust the URL if necessary

  // Optional: Assert that a welcome message or user-specific element is visible
  await expect(page.locator("body")).toContainText("Welcome back"); // Adjust the selector and text as needed
});

test("login with invalid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/login"); // Adjust the URL if necessary

  // Fill in the login form with invalid credentials
  await page.locator('input[type="email"]').fill("invalid@example.com");
  await page.locator('input[type="password"]').fill("wrongpassword");

  // Click the login button
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".Toastify__toast--error");

  // Assert that an error message is displayed
  await expect(page.locator(".Toastify__toast--error")).toContainText(
    "Login failed"
  ); // Adjust the selector and text as needed
});

test("login with empty fields", async ({ page }) => {
  await page.goto("http://localhost:5173/login"); // Adjust the URL if necessary

  // Click the login button without filling in any fields
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".Toastify__toast--error");

  // Assert that an error message is displayed for empty fields
  await expect(page.locator(".Toastify__toast--error")).toContainText(
    "All fields are required."
  ); // Adjust the selector and text as needed
});
