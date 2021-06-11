# imghash

`npm install --save @inventivetalent/imghash`

```js
import { imageHash } from "@inventivetalent/imghash";
import { readFileSync } from "fs";

const data = readFileSync("test.png");
const hash = await imageHash(data, { algorithm: "sha256" });
console.log(hash);
```
