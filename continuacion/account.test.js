const Account = require('./account.js');

test("Given I open an account, When I call getAmount(), Then it returns 0", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = new Account();

    // When: Accion que estamos testeando
    const value = testee.getAmount();

    // Then: Expectativas
    expect(value).toBe(0);
});

test("Given I open an account, When I call setAmount with 10, Then getAmount should return 10", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = new Account();

    // When: Accion que estamos testeando
    testee.setAmount(10);

    // Then: Expectativas
    expect(testee.getAmount()).toBe(10);
});

test("Given I open an account, When I set value that is not a number, Then it should throw and error", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = new Account();

    // When: Accion que estamos testeando
    action = () => {
        testee.setAmount("not a number") 
    }
    // Then: Expectativas
    expect(action).toThrow();
});
