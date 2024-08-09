describe("directory page", () => {
  beforeEach(() => {
    cy.login("jessica.williamson@gmail.com", "password");
  });

  it("can input average hour per Sprint", () => {
    cy.contains("button", "Directory").click();

    cy.get('[data-cy="avg-hr-per-sprint"]').click();
    cy.get("#avgHours").clear().type("12");
    cy.contains("button", "Save").click();
    cy.wait(2000);
    cy.reload();
    // TODO for later: create some sort of fixture instead
    cy.get('[data-cy="avg-hr-per-sprint"]')
      .invoke("text")
      .then((text) => {
        cy.log(text);
        expect(text).to.equal("12");
      });
  });
});
