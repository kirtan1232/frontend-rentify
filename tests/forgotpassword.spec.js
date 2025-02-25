// @ts-check
import { expect, test } from "@playwright/test";

test("forgot password with valid email", async ({ page }) => {
  await page.goto("http://localhost:5173/forgot-password"); // Adjust the URL if necessary

  // Fill in the email field with a valid email
  await page.locator('input[id="email"]').fill("test@example.com"); // Replace with a valid email

  // Click the "Send Reset Link" button
  await page.locator('button[type="submit"]').click();

  // Wait for the success message to appear
  await page.waitForSelector(".text-green-500"); // Adjust the selector if necessary

  // Assert that a success message is displayed
  await expect(page.locator(".text-green-500")).toContainText(
    "Email sent successfully"
  ); // Adjust the selector and text as needed.  This depends on your backend.
});

test("forgot password with invalid email", async ({ page }) => {
  await page.goto("http://localhost:5173/forgot-password"); // Adjust the URL if necessary

  // Fill in the email field with an invalid email
  await page.locator('input[id="email"]').fill("invalid@example.com");

  // Click the "Send Reset Link" button
  await page.locator('button[type="submit"]').click();

  // Wait for the error message to appear
  await page.waitForSelector(".text-green-500"); // Adjust the selector if necessary

  // Assert that an error message is displayed
  await expect(page.locator(".text-green-500")).toContainText(
    "User not found"
  ); // Adjust the selector and text as needed.  This depends on your backend.
});

test("forgot password with empty email field", async ({ page }) => {
  await page.goto("http://localhost:5173/forgot-password"); // Adjust the URL if necessary

  // Click the "Send Reset Link" button without filling in the email field
  await page.locator('button[type="submit"]').click();

  // Assert that the email field is required (check for validation message)
  // This might require a different approach depending on how your form handles validation
  // Example: Check for a specific error message near the email input
});

test("forgot password button shows loading state", async ({ page }) => {
  await page.goto("http://localhost:5173/forgot-password"); // Adjust the URL if necessary

  // Fill in the email field with a valid email
  await page.locator('input[id="email"]').fill("test@example.com"); // Replace with a valid email

  // Click the "Send Reset Link" button
  await page.locator('button[type="submit"]').click();

  // Assert that the button text changes to "Sending..."
  await expect(page.locator('button[type="submit"]')).toContainText(
    "Sending..."
  );

  // Wait for the success message to appear (or a reasonable amount of time)
  await page.waitForSelector(".text-green-500", { timeout: 5000 }); // Adjust timeout as needed

  // Assert that the button text changes back to "Send Reset Link" (or is enabled again)
  // This might require checking for the absence of the "Sending..." text or checking if the button is no longer disabled
  await expect(page.locator('button[type="submit"]')).not.toContainText(
    "Sending..."
  );
});
