describe("sign in flow", () => {
  beforeEach(() => {
    cy.visit(
      "https://chingu-dashboard-git-dev-chingu-dashboard.vercel.app/sign-in",
    );
  });

  it("should have email and password inputs with no inputs and a disabled Sign In button", () => {
    // test to verify that the email and password inputs are visible
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.contains("button", "Sign In").should("be.disabled");
  });

  it("successfully logs a user in ", () => {
    cy.get('input[name="email"]').type("jessica.williamson@gmail.com");
    cy.get('input[name="password"]').type("password");

    // ensure Sign In button is visible and abled before clicking
    cy.contains("button", "Sign In").should("not.be.disabled");
    cy.contains("button", "Sign In").should("be.visible");
    cy.contains("button", "Sign In").click();

    // verify we're back on a dashboard page
    cy.url().should(
      "match",
      /https:\/\/chingu-dashboard-git-dev-chingu-dashboard\.vercel\.app\/dashboard\/\d+/,
    );

    // TODO: uncomment this once PR is pushed where AuthHeader has a data-cy="nav-dropdown-menu" and retest
    // cy.get('[data-cy="nav-dropdown-menu"]').should("be-visible");

    cy.contains("button", "Log In").should("not.exist");
  });

  it("should fail to log in with an invalid email and password", () => {
    cy.get('input[name="email"]').type("jessica.williamson@gmail.com");
    cy.get('input[name="password"]').type("wrongpassword");

    cy.contains("button", "Sign In").should("be.visible");
    cy.contains("button", "Sign In").click();
    cy.contains("Submission Error").should("be.visible");
  });
});
