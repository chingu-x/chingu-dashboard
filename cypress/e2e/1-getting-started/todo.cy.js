/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

// describe("example to-do app", () => {
//   beforeEach(() => {
//     // Cypress starts out with a blank slate for each test
//     // so we must tell it to visit our website with the `cy.visit()` command.
//     // Since we want to visit the same URL at the start of all our tests,
//     // we include it in our beforeEach function so that it runs before each test
//     cy.visit("https://example.cypress.io/todo");
//   });

//   it("displays two todo items by default", () => {
//     // We use the `cy.get()` command to get all elements that match the selector.
//     // Then, we use `should` to assert that there are two matched items,
//     // which are the two default items.
//     cy.get(".todo-list li").should("have.length", 2);

//     // We can go even further and check that the default todos each contain
//     // the correct text. We use the `first` and `last` functions
//     // to get just the first and last matched elements individually,
//     // and then perform an assertion with `should`.
//     cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
//     cy.get(".todo-list li").last().should("have.text", "Walk the dog");
//   });

//   it("can add new todo items", () => {
//     // We'll store our item text in a variable so we can reuse it
//     const newItem = "Feed the cat";

//     // Let's get the input element and use the `type` command to
//     // input our new list item. After typing the content of our item,
//     // we need to type the enter key as well in order to submit the input.
//     // This input has a data-test attribute so we'll use that to select the
//     // element in accordance with best practices:
//     // https://on.cypress.io/selecting-elements
//     cy.get("[data-test=new-todo]").type(`${newItem}{enter}`);

//     // Now that we've typed our new item, let's check that it actually was added to the list.
//     // Since it's the newest item, it should exist as the last element in the list.
//     // In addition, with the two default items, we should have a total of 3 elements in the list.
//     // Since assertions yield the element that was asserted on,
//     // we can chain both of these assertions together into a single statement.
//     cy.get(".todo-list li")
//       .should("have.length", 3)
//       .last()
//       .should("have.text", newItem);
//   });

//   it("can check off an item as completed", () => {
//     // In addition to using the `get` command to get an element by selector,
//     // we can also use the `contains` command to get an element by its contents.
//     // However, this will yield the <label>, which is lowest-level element that contains the text.
//     // In order to check the item, we'll find the <input> element for this <label>
//     // by traversing up the dom to the parent element. From there, we can `find`
//     // the child checkbox <input> element and use the `check` command to check it.
//     cy.contains("Pay electric bill")
//       .parent()
//       .find("input[type=checkbox]")
//       .check();

//     // Now that we've checked the button, we can go ahead and make sure
//     // that the list element is now marked as completed.
//     // Again we'll use `contains` to find the <label> element and then use the `parents` command
//     // to traverse multiple levels up the dom until we find the corresponding <li> element.
//     // Once we get that element, we can assert that it has the completed class.
//     cy.contains("Pay electric bill")
//       .parents("li")
//       .should("have.class", "completed");
//   });

//   context("with a checked task", () => {
//     beforeEach(() => {
//       // We'll take the command we used above to check off an element
//       // Since we want to perform multiple tests that start with checking
//       // one element, we put it in the beforeEach hook
//       // so that it runs at the start of every test.
//       cy.contains("Pay electric bill")
//         .parent()
//         .find("input[type=checkbox]")
//         .check();
//     });

//     it("can filter for uncompleted tasks", () => {
//       // We'll click on the "active" button in order to
//       // display only incomplete items
//       cy.contains("Active").click();

//       // After filtering, we can assert that there is only the one
//       // incomplete item in the list.
//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .first()
//         .should("have.text", "Walk the dog");

//       // For good measure, let's also assert that the task we checked off
//       // does not exist on the page.
//       cy.contains("Pay electric bill").should("not.exist");
//     });

//     it("can filter for completed tasks", () => {
//       // We can perform similar steps as the test above to ensure
//       // that only completed tasks are shown
//       cy.contains("Completed").click();

//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .first()
//         .should("have.text", "Pay electric bill");

//       cy.contains("Walk the dog").should("not.exist");
//     });

//     it("can delete all completed tasks", () => {
//       // First, let's click the "Clear completed" button
//       // `contains` is actually serving two purposes here.
//       // First, it's ensuring that the button exists within the dom.
//       // This button only appears when at least one task is checked
//       // so this command is implicitly verifying that it does exist.
//       // Second, it selects the button so we can click it.
//       cy.contains("Clear completed").click();

//       // Then we can make sure that there is only one element
//       // in the list and our element does not exist
//       cy.get(".todo-list li")
//         .should("have.length", 1)
//         .should("not.have.text", "Pay electric bill");

//       // Finally, make sure that the clear button no longer exists.
//       cy.contains("Clear completed").should("not.exist");
//     });
//   });
// });

// directory 2-advanced-examples:

// /// <reference types="cypress" />

// context("Actions", () => {
//   beforeEach(() => {
//     cy.visit("https://example.cypress.io/commands/actions");
//   });

//   // https://on.cypress.io/interacting-with-elements

//   it(".type() - type into a DOM element", () => {
//     // https://on.cypress.io/type
//     cy.get(".action-email")
//       .type("fake@email.com")
//       .should("have.value", "fake@email.com")

//       // .type() with special character sequences
//       .type("{leftarrow}{rightarrow}{uparrow}{downarrow}")
//       .type("{del}{selectall}{backspace}")

//       // .type() with key modifiers
//       .type("{alt}{option}") //these are equivalent
//       .type("{ctrl}{control}") //these are equivalent
//       .type("{meta}{command}{cmd}") //these are equivalent
//       .type("{shift}")

//       // Delay each keypress by 0.1 sec
//       .type("slow.typing@email.com", { delay: 100 })
//       .should("have.value", "slow.typing@email.com");

//     cy.get(".action-disabled")
//       // Ignore error checking prior to type
//       // like whether the input is visible or disabled
//       .type("disabled error checking", { force: true })
//       .should("have.value", "disabled error checking");
//   });

//   it(".focus() - focus on a DOM element", () => {
//     // https://on.cypress.io/focus
//     cy.get(".action-focus")
//       .focus()
//       .should("have.class", "focus")
//       .prev()
//       .should("have.attr", "style", "color: orange;");
//   });

//   it(".blur() - blur off a DOM element", () => {
//     // https://on.cypress.io/blur
//     cy.get(".action-blur")
//       .type("About to blur")
//       .blur()
//       .should("have.class", "error")
//       .prev()
//       .should("have.attr", "style", "color: red;");
//   });

//   it(".clear() - clears an input or textarea element", () => {
//     // https://on.cypress.io/clear
//     cy.get(".action-clear")
//       .type("Clear this text")
//       .should("have.value", "Clear this text")
//       .clear()
//       .should("have.value", "");
//   });

//   it(".submit() - submit a form", () => {
//     // https://on.cypress.io/submit
//     cy.get(".action-form").find('[type="text"]').type("HALFOFF");

//     cy.get(".action-form")
//       .submit()
//       .next()
//       .should("contain", "Your form has been submitted!");
//   });

//   it(".click() - click on a DOM element", () => {
//     // https://on.cypress.io/click
//     cy.get(".action-btn").click();

//     // You can click on 9 specific positions of an element:
//     //  -----------------------------------
//     // | topLeft        top       topRight |
//     // |                                   |
//     // |                                   |
//     // |                                   |
//     // | left          center        right |
//     // |                                   |
//     // |                                   |
//     // |                                   |
//     // | bottomLeft   bottom   bottomRight |
//     //  -----------------------------------

//     // clicking in the center of the element is the default
//     cy.get("#action-canvas").click();

//     cy.get("#action-canvas").click("topLeft");
//     cy.get("#action-canvas").click("top");
//     cy.get("#action-canvas").click("topRight");
//     cy.get("#action-canvas").click("left");
//     cy.get("#action-canvas").click("right");
//     cy.get("#action-canvas").click("bottomLeft");
//     cy.get("#action-canvas").click("bottom");
//     cy.get("#action-canvas").click("bottomRight");

//     // .click() accepts an x and y coordinate
//     // that controls where the click occurs :)

//     cy.get("#action-canvas")
//       .click(80, 75) // click 80px on x coord and 75px on y coord
//       .click(170, 75)
//       .click(80, 165)
//       .click(100, 185)
//       .click(125, 190)
//       .click(150, 185)
//       .click(170, 165);

//     // click multiple elements by passing multiple: true
//     cy.get(".action-labels>.label").click({ multiple: true });

//     // Ignore error checking prior to clicking
//     cy.get(".action-opacity>.btn").click({ force: true });
//   });

//   it(".dblclick() - double click on a DOM element", () => {
//     // https://on.cypress.io/dblclick

//     // Our app has a listener on 'dblclick' event in our 'scripts.js'
//     // that hides the div and shows an input on double click
//     cy.get(".action-div").dblclick().should("not.be.visible");
//     cy.get(".action-input-hidden").should("be.visible");
//   });

//   it(".rightclick() - right click on a DOM element", () => {
//     // https://on.cypress.io/rightclick

//     // Our app has a listener on 'contextmenu' event in our 'scripts.js'
//     // that hides the div and shows an input on right click
//     cy.get(".rightclick-action-div").rightclick().should("not.be.visible");
//     cy.get(".rightclick-action-input-hidden").should("be.visible");
//   });

//   it(".check() - check a checkbox or radio element", () => {
//     // https://on.cypress.io/check

//     // By default, .check() will check all
//     // matching checkbox or radio elements in succession, one after another
//     cy.get('.action-checkboxes [type="checkbox"]')
//       .not("[disabled]")
//       .check()
//       .should("be.checked");

//     cy.get('.action-radios [type="radio"]')
//       .not("[disabled]")
//       .check()
//       .should("be.checked");

//     // .check() accepts a value argument
//     cy.get('.action-radios [type="radio"]')
//       .check("radio1")
//       .should("be.checked");

//     // .check() accepts an array of values
//     cy.get('.action-multiple-checkboxes [type="checkbox"]')
//       .check(["checkbox1", "checkbox2"])
//       .should("be.checked");

//     // Ignore error checking prior to checking
//     cy.get(".action-checkboxes [disabled]")
//       .check({ force: true })
//       .should("be.checked");

//     cy.get('.action-radios [type="radio"]')
//       .check("radio3", { force: true })
//       .should("be.checked");
//   });

//   it(".uncheck() - uncheck a checkbox element", () => {
//     // https://on.cypress.io/uncheck

//     // By default, .uncheck() will uncheck all matching
//     // checkbox elements in succession, one after another
//     cy.get('.action-check [type="checkbox"]')
//       .not("[disabled]")
//       .uncheck()
//       .should("not.be.checked");

//     // .uncheck() accepts a value argument
//     cy.get('.action-check [type="checkbox"]')
//       .check("checkbox1")
//       .uncheck("checkbox1")
//       .should("not.be.checked");

//     // .uncheck() accepts an array of values
//     cy.get('.action-check [type="checkbox"]')
//       .check(["checkbox1", "checkbox3"])
//       .uncheck(["checkbox1", "checkbox3"])
//       .should("not.be.checked");

//     // Ignore error checking prior to unchecking
//     cy.get(".action-check [disabled]")
//       .uncheck({ force: true })
//       .should("not.be.checked");
//   });

//   it(".select() - select an option in a <select> element", () => {
//     // https://on.cypress.io/select

//     // at first, no option should be selected
//     cy.get(".action-select").should("have.value", "--Select a fruit--");

//     // Select option(s) with matching text content
//     cy.get(".action-select").select("apples");
//     // confirm the apples were selected
//     // note that each value starts with "fr-" in our HTML
//     cy.get(".action-select").should("have.value", "fr-apples");

//     cy.get(".action-select-multiple")
//       .select(["apples", "oranges", "bananas"])
//       // when getting multiple values, invoke "val" method first
//       .invoke("val")
//       .should("deep.equal", ["fr-apples", "fr-oranges", "fr-bananas"]);

//     // Select option(s) with matching value
//     cy.get(".action-select")
//       .select("fr-bananas")
//       // can attach an assertion right away to the element
//       .should("have.value", "fr-bananas");

//     cy.get(".action-select-multiple")
//       .select(["fr-apples", "fr-oranges", "fr-bananas"])
//       .invoke("val")
//       .should("deep.equal", ["fr-apples", "fr-oranges", "fr-bananas"]);

//     // assert the selected values include oranges
//     cy.get(".action-select-multiple")
//       .invoke("val")
//       .should("include", "fr-oranges");
//   });

//   it(".scrollIntoView() - scroll an element into view", () => {
//     // https://on.cypress.io/scrollintoview

//     // normally all of these buttons are hidden,
//     // because they're not within
//     // the viewable area of their parent
//     // (we need to scroll to see them)
//     cy.get("#scroll-horizontal button").should("not.be.visible");

//     // scroll the button into view, as if the user had scrolled
//     cy.get("#scroll-horizontal button").scrollIntoView().should("be.visible");

//     cy.get("#scroll-vertical button").should("not.be.visible");

//     // Cypress handles the scroll direction needed
//     cy.get("#scroll-vertical button").scrollIntoView().should("be.visible");

//     cy.get("#scroll-both button").should("not.be.visible");

//     // Cypress knows to scroll to the right and down
//     cy.get("#scroll-both button").scrollIntoView().should("be.visible");
//   });

//   it(".trigger() - trigger an event on a DOM element", () => {
//     // https://on.cypress.io/trigger

//     // To interact with a range input (slider)
//     // we need to set its value & trigger the
//     // event to signal it changed

//     // Here, we invoke jQuery's val() method to set
//     // the value and trigger the 'change' event
//     cy.get(".trigger-input-range")
//       .invoke("val", 25)
//       .trigger("change")
//       .get("input[type=range]")
//       .siblings("p")
//       .should("have.text", "25");
//   });

//   it("cy.scrollTo() - scroll the window or element to a position", () => {
//     // https://on.cypress.io/scrollto

//     // You can scroll to 9 specific positions of an element:
//     //  -----------------------------------
//     // | topLeft        top       topRight |
//     // |                                   |
//     // |                                   |
//     // |                                   |
//     // | left          center        right |
//     // |                                   |
//     // |                                   |
//     // |                                   |
//     // | bottomLeft   bottom   bottomRight |
//     //  -----------------------------------

//     // if you chain .scrollTo() off of cy, we will
//     // scroll the entire window
//     cy.scrollTo("bottom");

//     cy.get("#scrollable-horizontal").scrollTo("right");

//     // or you can scroll to a specific coordinate:
//     // (x axis, y axis) in pixels
//     cy.get("#scrollable-vertical").scrollTo(250, 250);

//     // or you can scroll to a specific percentage
//     // of the (width, height) of the element
//     cy.get("#scrollable-both").scrollTo("75%", "25%");

//     // control the easing of the scroll (default is 'swing')
//     cy.get("#scrollable-vertical").scrollTo("center", { easing: "linear" });

//     // control the duration of the scroll (in ms)
//     cy.get("#scrollable-both").scrollTo("center", { duration: 2000 });
//   });
// });
