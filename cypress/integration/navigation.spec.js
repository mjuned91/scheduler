describe("Navigation", () => {

  it("should navigate to Tuesday, click it, and confirm the background color", () => {
    cy.visit("/");
    
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});