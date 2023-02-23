## Parte 7. Preparando nuestros test para futuros cambios
La persona encargada del proyecto nos llama y nos dice que para promocionar nuestro nuevo banco, por defecto cuando se cree una account, esta tendra 5 euros.

Si cambiamos nuestra Account, quedaria asi:
```javascript
class Account {
  constructor() {
    this.amount = 5;
    this.isAccountBlocked = false;
  }
    // [...] Resto del codigo
}
```

Ahora podemos correr nuestros tests para ver que requisitos han cambiado, vemos que no solo fallan los tests de Account, sino tambien de Atm!

Primero lo primero: Vamos a arreglar nuestro `account.test.js` ya que si es correcto que fallen porque los requisitos han cambiado:

```javascript
test("Given I open an account, When I call getAmount(), Then it returns 5", () => {
    // Given
    testee = new Account();

    // When
    const value = testee.getAmount();

    // Then
    expect(value).toBe(5);
});
```

Por otro lado, vemos que los requisitos de atm no han cambiado, pero nuestros tests estan fallando!

Cuando hacemos un cambio en un fichero, no queremos que todos los tests que lo tienen como dependencia fallen. Ahora mismo solo Atm depende de Account, pero imaginaros que tenemos una aplicacion con varias clases que dependen de Account: necesitariamos mucho tiempo para arreglar todos los tests que fallen y todo por un simple cambio.

En lugar de eso, lo que deberiamos de hacer es que la clase que estamos testeando no tenga directamente ninguna dependencia en nuestros tests, si no que dependa de "copias" que funcionan de forma parecida. En nuestro caso, queremos que Atm use una copia de Account, pero no account directamente. Para esto usamos mocks. [Mira el ejemplo de mocks en la documentacion oficial de Jest](https://jestjs.io/docs/mock-functions#mocking-modules).

Un mock permite testear como el codigo se comunica entre si. En el caso de la Atm, lo correcto seria testear que al llamar a `getAccountInformation()` esta funcion esta llamando a `account.getAmount()` y que devuelve lo que sea que devuelva esa funcion.

Esto nos da mucha mas flexibilidad en el codigo ya que podriamos modificar distintos ficheros sin miedo a que los tets de otros ficheros fallen.

Como escribir los tests usando mocks. Primero, tenemos que decirle a nuestros test que usen una copia false de `./account.js`.
```javascript
const Atm = require('./atm.js');
require('./account.js');

let mockGetAmount = jest.fn(() => 0);
let mockSetAmount = jest.fn(() => {});
jest.mock('./account.js', () => {
  return jest.fn().mockImplementation(() => {
    return { getAmount: mockGetAmount, setAmount: mockSetAmount };
  });
});
```

Luego, en mi primer test, pongo el resultado que espero que me devuelva y ademas, compruebo que se esta llamando a `getAmountMock`.
```javascript
test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(mockGetAmount).toHaveBeenCalled();
});
```

En mi segundo test, cuando se llama a makeDeposit, cambio mi expect a que lo que espero que se llame a setAmount. 

```javascript
test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    testee.makeDeposit(20);
    //Then
    expect(mockSetAmount).toHaveBeenCalledWith(20);
});
```

