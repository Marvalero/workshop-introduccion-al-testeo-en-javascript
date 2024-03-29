const Account = require('./account.js');

test("Given I open an account, When I call getAmount(), Then it returns 0", () => {
    // Given
    testee = new Account();

    // When
    const value = testee.getAmount();

    // Then
    expect(value).toBe(5);
});

test("Given I open an account, When I call setAmount with 10, Then getAmount should return 10", () => {
    // Given
    testee = new Account();

    // When
    testee.setAmount(10);

    // Then
    expect(testee.getAmount()).toBe(10);
});

test("Given I open an account, When I set value that is not a number, Then it should throw and error", () => {
    // Given
    testee = new Account();

    // When
    action = () => {
        testee.setAmount("not a number") 
    }
    // Then
    expect(action).toThrow();
});


test("Given I open an account, When I call getBlockAccount, I expect it to return false by default", () => {
    // Given
    testee = new Account();

    // When
    const value = testee.getBlockAccount();

    // Then
    expect(value).toBe(false);
});

test("Given I open an account, When I call blockAccount, I expect getBlockAccount to return true", () => {
    // Given
    testee = new Account();

    // When
    testee.blockAccount();

    // Then
    expect(testee.getBlockAccount()).toBe(true);
});

test("Given I open an account, When I call blockAccount, I expect that calling setAmount with a number to return an error", () => {
    // Given
    testee = new Account();

    // When
    testee.blockAccount();

    // Then
    expect(() => { testee.setAmount(23) }).toThrow();
});