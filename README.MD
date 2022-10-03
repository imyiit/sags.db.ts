# **SagsDbTs**


![Image](https://img.shields.io/npm/v/sags.db.ts?color=%2351F9C0&label=sags.db) 
![Image](https://img.shields.io/npm/dt/sags.db.ts.svg?color=%2351FC0&maxAge=3600) 
#
![Image](https://nodei.co/npm/sags.db.ts.png?downloads=true&downloadRank=true&stars=true)
<br>


**Sags.db.ts** is JSON database system.

## <i class="fa-solid fa-download"></i> **Installation**

```bash
npm install sags.db.ts
```

## <i class="fa-solid fa-bookmark"></i> **Usage**

```js
const sagsdb = require("sags");
```
Default database name is "**db**".

Db name and folder name is must be **String**.

Database folder name is optional. 

If u dont wanna minify set "**minify**" to false.
```js
const db = new sagsdb({ name: "database", folder: "foldername", minify: true });
```
**or**
```js
const db = new sagsdb({ name: "database", folder: "folder/database"});
```
**or**
```js
const db = new sagsdb({ name: "database"});
```
<br>

## You can create multi database. 
```js
const userdb = new sagsdb({ name: "userdb"});
const itemdb = new sagsdb({ name: "itemdb"});
```
<br><br>

### <i class="fa-solid fa-terminal"></i> **COMMANDS**
<br>

 ## **Set** 

Key must be a **String** or **Number**.
```js
db.set("key", "apple"); // -> db
```

Can't set **Function**.
```js
function test(){

};
db.set("key", test); // -> return Error
```
<br><br>

## **Get**

Key must be a **String** or **Number**.

```js
db.set("key", "apple"); // -> db

db.get("key"); // -> apple
```

<br><br>

## **Delete**

Delete item from database.

```js
db.set("key", "apple"); // -> db

db.delete("key"); // -> db

db.get("key"); // -> undefined
```

<br><br>

## **Type**

Check type for this key.

```js
db.set("key", "apple");
db.type("key"); // -> string

db.set("array", [1, 2, 3]);
db.type("array"); // -> array

db.set("object", { a: 1, b: 2 }); // -> true
db.type("object"); // -> object

db.set("number", 1); // -> true
db.type("number"); // -> number

```

<br><br>

## **Has**

Check database for this key.

```js
db.set("key", "apple"); // -> db
db.has("key"); // -> true

db.has("another"); // -> false
```
<br><br>

## **Push**

Push item in **Array**.

```js
db.push("array", "apple"); // -> db
db.get("array"); // -> ["apple"]

db.push("array","banana"); // -> db
db.get("array"); // -> ["apple", "banana"]
```

<br><br>

## **Unpush**

Unpush item from **Array**.

```js
db.unpush("array", "apple"); // -> db
db.get("array"); // -> ["apple"]

db.unpush("array", "apple"); // -> tdb
db.get("array"); // -> []
```

<br><br>

## **Add**

Add number to **number** value.

Value must be a **Number**.

Default number is **1**.

```js
db.set("number", 1); // -> db
db.get("number"); // -> 1

db.add("number", 3); // -> db
db.get("number"); // -> 4

db.add("number"); // -> db
db.get("number"); // 5

db.add("number", "asd"); // return Error
```
<br><br>

## **Subtract**

Subtract number to **number** value.

Value must be a **Number**.

Default number is **1**.

```js
db.set("number", 1); // -> db
db.get("number"); // -> 1

db.subtract("number", 3); // -> db
db.get("number"); // -> -2

db.subtract("number"); // -> db
db.get("number"); // -3

db.subtract("number", "asd"); // return Error
```
<br><br>

## **All**

Return all **Database** object.

```js
db.set("key", "apple");
db.set("number", 1);
db.all(); // -> {"key" : "apple", "number": 1}
```

<br><br>

## **DeleteAll**

Delete **all** database.

```js
db.set("key", "apple"); // -> db
db.get("key"); // -> apple
db.deleteAll(); // -> true
db.get("key"); // -> undefined
```

<br><br>

## **Dbsize**

Get database **size**.

Number type is **Byte** (byte).

```js
db.set("key", "apple"); // -> true
db.dbSize(); // -> 15
```

## **Extra**

U can set object in object.

```js
db.set("key.value","apple"); // -> db
db.get("key"); // => {key: { value : "apple" } }
```

## License
[MIT](https://choosealicense.com/licenses/mit/)

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
