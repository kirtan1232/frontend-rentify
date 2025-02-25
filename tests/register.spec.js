// @ts-check
import { expect, test } from "@playwright/test";

test("register with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:5173/register"); // Adjust the URL if necessary

  // Fill in the registration form
  await page.locator('input[id="name"]').fill("Test User"); // Replace with a valid name
  await page.locator('input[id="email"]').fill("test@example.com"); // Replace with a valid email
  await page.locator('input[id="password"]').fill("1234"); // Replace with a valid password
  await page.locator('input[id="confirmPassword"]').fill("1234"); // Replace with a valid password

  // Click the register button
  await page.locator('button[type="submit"]').click();

  // Wait for navigation or a specific element to appear after successful registration
  await page.waitForURL("http://localhost:5173/login"); // Adjust the URL if necessary

  // Assert that the user is redirected to the login page or a success message is displayed
  await expect(page).toHaveURL("http://localhost:5173/login"); // Adjust the URL if necessary

  // Optional: Assert that a success message is visible
  // await expect(page.locator("body")).toContainText("User registered successfully!"); // Adjust the selector and text as needed
});

test("register with invalid credentials (passwords do not match)", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/register"); // Adjust the URL if necessary

  // Fill in the registration form with mismatched passwords
  await page.locator('input[id="name"]').fill("Test User");
  await page.locator('input[id="email"]').fill("test@example.com");
  await page.locator('input[id="password"]').fill("password123");
  await page.locator('input[id="confirmPassword"]').fill("differentPassword");

  // Click the register button
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".Toastify__toast--error");

  // Assert that an error message is displayed
  await expect(page.locator(".Toastify__toast--error")).toContainText(
    "Passwords do not match"
  ); // Adjust the selector and text as needed
});

test("register with empty fields", async ({ page }) => {
  await page.goto("http://localhost:5173/register"); // Adjust the URL if necessary

  // Click the register button without filling in any fields
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".Toastify__toast--error");

  // Assert that an error message is displayed for empty fields
  await expect(page.locator(".Toastify__toast--error")).toContainText(
    "All fields are required"
  ); // Adjust the selector and text as needed
});

test("register with existing email", async ({ page }) => {
  await page.goto("http://localhost:5173/register"); // Adjust the URL if necessary

  // Fill in the registration form with an existing email
  await page.locator('input[id="name"]').fill("Test User");
  await page.locator('input[id="email"]').fill("shresthakirtan4@gmail.com"); // Use an email that already exists in your database
  await page.locator('input[id="password"]').fill("password123");
  await page.locator('input[id="confirmPassword"]').fill("password123");

  // Click the register button
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".Toastify__toast--error");

  // Assert that an error message is displayed for existing email
  await expect(page.locator(".Toastify__toast--error")).toContainText(
    "Email already exists"
  ); // Adjust the selector and text as needed.  The exact message depends on your backend.
});
