# Node Js Internal Module Part 15

Node.js memiliki beberapa modul bawaan (internal modules) yang menyediakan berbagai fungsionalitas yang berguna untuk pengembangan aplikasi. Berikut adalah beberapa modul bawaan yang umum digunakan, beserta contoh implementasinya dengan pendekatan synchronous:


1. **fs (File System)**:

Modul `fs` digunakan untuk berinteraksi dengan sistem berkas, seperti membaca dan menulis file.

Contoh implementasi:
```js
const fs = require('fs');

// Membaca isi dari file secara synchronous
const content = fs.readFileSync('example.txt', 'utf8');
console.log(content);

// Menulis teks ke dalam file secara synchronous
const newText = 'Hello, Node.js!';
fs.writeFileSync('newFile.txt', newText);
console.log('File written successfully.');
```

2. **path**:

Modul `path` digunakan untuk memanipulasi dan menghasilkan jalur (path) file dan direktori.

Contoh implementasi:
```js
const path = require('path');

const filePath = '/users/docs/index.html';
const fileName = path.basename(filePath);
console.log('File name:', fileName);

const absolutePath = path.resolve('folder', 'file.txt');
console.log('Absolute path:', absolutePath);
```

3. **http**:

Modul http memungkinkan Anda untuk membuat server HTTP dan menangani permintaan serta respons HTTP.

Contoh implementasi:
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello, Node.js HTTP Server!</h1>');
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

4. **os**:

Modul `os` menyediakan informasi tentang sistem operasi, seperti informasi CPU, memori, dan lingkungan.

Contoh implementasi:
```js
const os = require('os');

console.log('OS Type:', os.type());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
```

5. **util**:

Modul `util` berisi fungsi-fungsi utilitas yang membantu dalam pengembangan.

Contoh implementasi:
```js
const util = require('util');

const asyncFunction = util.promisify(setTimeout);

asyncFunction(2000).then(() => {
  console.log('Delayed task completed.');
});
```

**Catatan**:
Penting untuk diingat bahwa metode synchronous (dengan menggunakan callback) dalam modul-modul bawaan Node.js mungkin tidak akan cocok untuk aplikasi yang perlu bersifat non-blocking. Biasanya, pendekatan asynchronous lebih disarankan untuk menghindari menghambat kinerja aplikasi dan memastikan responsivitas yang lebih baik.

Penggunaan metode asynchronous (async/await atau menggunakan callback) lebih umum dalam pengembangan Node.js yang sesuai dengan model non-blocking yang ada pada lingkungan tersebut.