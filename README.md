## Async wrapper for web storage

```sh
npm install async-web-storage
```

### Example
```js
import { asyncLocalStorage, asyncSessionStorage } from 'async-web-storage';

async function saveLocally() {
  await asyncLocalStorage.setItem('foo', 'bar');
  const foo = await asyncLocalStorage.getItem('foo'); // bar

  const person = {
    name: 'mcha',
  };
  await asyncLocalStorage.setItem('user_1', person);
  const user = await asyncLocalStorage.getItem('user_1'); // {name: "mcha"}
}
```

All values are stored as `JSON.stringify`ed objects `{[key]: value, createAt: Date.now()}`

For example, the above values would exisit in local storage like this:
|Key     |Value
|--------|-------------------------------
|foo     |`"{\"foo\":\"bar\",\"createdAt\":1600516661351}"`
|user_1  |`"{\"name\":\"mcha\",\"createdAt\":1600516591899}"`
|        |

To have access to the raw stored objects pass an option object `{raw: true}` as a 2nd argument `.getItem`

```js
const rawStoredUser1 = await asyncLocalStorage.getItem('user_1', {raw: true});

console.log(rawStoredUser1); // {name: "mcha", createdAt: 1600516591899}
```