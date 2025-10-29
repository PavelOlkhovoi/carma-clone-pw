import { test, expect } from "@playwright/test";
import { setupAllMocks, mockOMTMapHosting } from "@carma-commons/e2e";
import { responseWithTwoOffices, gemarkung } from "../fixtures/mock-responses";

test.describe("lagis temp smoke test", () => {
  test("main page show map, menu, combo boxes and selected offices after authorization", async ({
    page,
    context,
  }) => {
    await setupAllMocks(context);
    await mockOMTMapHosting(context);

    await context.route("https://lagis-api.cismet.de/users", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: "cismet",
          domain: "LAGIS",
          jwt: "0000000",
          passHash: "0000000",
          userGroups: ["Lagerbuch", "NKF"],
        }),
      })
    );
    // Add this mock for flurstuecke data
    await context.route(
      "https://lagis-api.cismet.de/graphql/LAGIS/execute",
      (route) => {
        const requestBody = route.request().postDataJSON();

        // Check if it's a flurstuecke query FIRST (since it also contains "gemarkung")
        if (requestBody.query.includes("view_flurstueck_schluessel")) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              data: {
                view_flurstueck_schluessel: [
                  {
                    alkis_id: "053001-003-00039",
                    schluessel_id: 2197,
                    flurstueckart: "städtisch",
                    historisch: false,
                  },
                  {
                    alkis_id: "053001-003-00040",
                    schluessel_id: 2198,
                    flurstueckart: "städtisch",
                    historisch: false,
                  },
                  {
                    alkis_id: "053001-003-00041",
                    schluessel_id: 2199,
                    flurstueckart: "städtisch",
                    historisch: false,
                  },
                ],
                gemarkung: [
                  {
                    schluessel: 3001,
                    bezeichnung: "Barmen",
                  },
                  {
                    schluessel: 3271,
                    bezeichnung: "Haan",
                  },
                ],
              },
            }),
          });
        }

        // Check if it's the detailed flurstueck query (with variables) FIRST
        if (
          requestBody.query.includes("extended_alkis_flurstueck") &&
          requestBody.variables &&
          (requestBody.variables.alkis_id ||
            requestBody.variables.schluessel_id)
        ) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(responseWithTwoOffices),
          });
        }

        // Check if it's a gemarkung-only query (without variables)
        if (
          requestBody.query.includes("gemarkung") &&
          (!requestBody.variables ||
            Object.keys(requestBody.variables).length === 0)
        ) {
          return route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(gemarkung),
          });
        }

        // Default fallback for other queries
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: {} }),
        });
      }
    );

    // Navigate to the application
    await page.goto("/");
  });
});
