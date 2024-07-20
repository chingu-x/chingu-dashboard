describe("directory page", () => {
  beforeEach(() => {
    cy.login("jessica.williamson@gmail.com", "password");
  });

  // it("can add average hour per Sprint", () => {
  //   cy.contains("button", "Directory").click();

  //   cy.get('[data-cy="avg-hr-per-sprint"]').click();
  //   cy.get("#avgHours").clear().type("35");
  //   cy.contains("button", "Save").click();
  //   cy.get('[data-cy="avg-hr-per-sprint"]')
  //     .invoke("text")
  //     .then((text) => {
  //       cy.log(text);
  //       expect(text).to.equal("35");
  //     });
  // });
});
