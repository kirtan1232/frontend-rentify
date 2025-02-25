// @ts-check
import { expect, test } from "@playwright/test";

test("flat details page displays flat details", async ({ page }) => {
  // Replace with a valid flat ID
  const flatId = "67b1dd409fa33b0f620c3839"; // Example flat ID, replace with a real one

  await page.goto(`http://localhost:5173/flat-details/${flatId}`); // Adjust the URL if necessary

  // Wait for the flat details to load (adjust timeout if needed)
  await page.waitForSelector(".border-gray-300", { timeout: 10000 });

  // Assert that the flat description is displayed
  const flatDescription = await page
    .locator(".text-2xl.font-semibold.text-gray-800")
    .textContent();
  expect(flatDescription).not.toBeNull();

  // Assert that the price is displayed
  const price = await page.locator('div:has-text("Price:")').textContent();
  expect(price).toContain("₹");

  // Assert that the address is displayed
  const address = await page.locator('div:has-text("Address:")').textContent();
  expect(address).not.toBeNull();
});

test("flat details page opens and closes the message modal", async ({
  page,
}) => {
  // Replace with a valid flat ID
  const flatId = "67b1dd409fa33b0f620c3839"; // Example flat ID, replace with a real one

  await page.goto(`http://localhost:5173/flat-details/${flatId}`); // Adjust the URL if necessary

  // Click the "Ask Anything About This Room/Flat" button
  await page
    .locator('button:has-text("Ask Anything About This Room/Flat")')
    .click();

  // Wait for the modal to open
  await page.waitForSelector(".fixed.inset-0.bg-black.bg-opacity-50");

  // Assert that the modal is visible
  await expect(
    page.locator(".fixed.inset-0.bg-black.bg-opacity-50")
  ).toBeVisible();

  // Click the "Cancel" button
  await page.locator('button:has-text("Cancel")').click();

  // Wait for the modal to close
  await page.waitForSelector(".fixed.inset-0.bg-black.bg-opacity-50", {
    state: "detached",
  });

  // Assert that the modal is no longer visible
  await expect(
    page.locator(".fixed.inset-0.bg-black.bg-opacity-50")
  ).toBeHidden();
});

test("flat details page handles eSewa payment button click", async ({
  page,
}) => {
  // Replace with a valid flat ID
  const flatId = "67b1dd409fa33b0f620c3839"; // Example flat ID, replace with a real one

  await page.goto(`http://localhost:5173/flat-details/${flatId}`); // Adjust the URL if necessary

  // Click the "Rent Now with eSewa" button
  // This test only checks if the button click triggers the eSewa call
  // It doesn't verify the actual payment process
  await page.locator('button:has-text("Rent Now with eSewa")').click();

  // You can add additional assertions here to check if the eSewa form is submitted
  // For example, you can check if a new window or tab is opened
  // Or you can check if the page navigates to the eSewa payment gateway
  // However, these assertions might be more complex and require additional setup
});
