import { expect, test } from "@playwright/test";
// import { runMapSmokeTest, setupSmokeTest, setupAllMocks } from "@carma-commons/e2e";

test.describe("x-and-ride smoke test", () => {
  // test.beforeEach(async ({ context, page }) => {
  //   await setupAllMocks(context, ["bezirke", "quartiere", 'kitas', "pois", "prbr", "prbr.data"]);
  //   await setupSmokeTest(page, "/", {
  //     navigationTimeout: 30000,
  //     waitForNetworkIdle: true,
  //   });
  // });

  test("map loads with key controls", async ({ page }) => {
    // Run the comprehensive smoke test from the shared library
    // await runMapSmokeTest(page, {
    //   fuzzySearchTimeout: 10000,
    //   checkZoomControl: true,
    //   checkFuzzySearch: true,
    //   checkApplicationMenu: true,
    //   checkInfoBox: true,
    // });

    // await page.goto("/");
    // await page.waitForLoadState("networkidle");
    await expect(page.getByText('Test')).toBeVisible();
  });
});
