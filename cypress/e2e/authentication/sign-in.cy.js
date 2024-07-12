describe("sign in flow", () => {
  beforeEach(() => {
    cy.visit(
      "https://chingu-dashboard-git-dev-chingu-dashboard.vercel.app/dashboard",
    );
    cy.contains("button", "Log In").should("be.visible");
    cy.contains("button", "Log In").click();
    cy.url().should(
      "eq",
      "https://chingu-dashboard-git-dev-chingu-dashboard.vercel.app/sign-in",
    );
  });

  it("should have email and password inputs", () => {
    // test to verify that the email and password inputs are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it(" bring user to their private account after successful login ", () => {
    cy.get('input[name="email"]').type("jessica.williamson@gmail.com");
    cy.get('input[name="password"]').type("password");

    // ensure Sign In button is visible before clicking
    cy.contains("button", "Sign In").should("be.visible");
    cy.contains("button", "Sign In").click();

    // verify we're back on a dashboard page
    cy.url().should(
      "match",
      /https:\/\/chingu-dashboard-git-dev-chingu-dashboard\.vercel\.app\/dashboard(\/\d+)?/,
    );

    // TODO: uncomment this once PR is pushed where AuthHeader has a data-testid="nav-dropdown-menu" and retest
    // cy.get('[data-testid="nav-dropdown-menu"]').should("be-visible");

    cy.contains("button", "Log In").should("not.exist");
  });
});
