# waitly

> waitly alat ringan untuk menangani delay berbasis promise

_Dilengkapi dengan fitur tambahan seperti pembatalan delay, penjadwalan tugas, dan validasi parameter. Mendukung penggunaan `AbortController` untuk membatalkan delay secara asinkron._

## Instalasi

```bash
npm install waitly
```

## API

### `waitly(milliseconds, options)`

Fungsi utama untuk membuat delay berbasis promise.

#### Parameter:

- `milliseconds` _(Number)_: Durasi delay dalam milidetik (wajib, harus bernilai non-negatif).
- `options` _(Object)_ _(Opsional)_:
  - `returnValue` _(Any)_: Nilai yang akan dikembalikan setelah delay selesai.
  - `abortSignal` _(AbortSignal)_: Objek `AbortSignal` untuk membatalkan delay menggunakan `AbortController`.

#### Kembalian:

- _(Promise)_: Sebuah promise yang selesai setelah delay. Jika `abortSignal` digunakan untuk membatalkan delay, promise akan gagal dengan error `'Delay dibatalkan'`.

```js
import { waitly } from 'waitly' // ESM
const { waitly } = require('waitly') // CommonJS

function runExample() {
  console.log('Start')
  waitly(2000, { returnValue: 'Selesai' }).then(() => {
    console.log('End') // Dicetak setelah 2 detik
  })
}

runExample()
```

### `waitly.cancelDelay(promise, controller)`

Membatalkan delay secara manual menggunakan `AbortController`.

#### Parameter:

- `promise` _(Promise)_: Promise yang dibuat oleh `waitly`.
- `controller` _(AbortController)_: Objek `AbortController` yang terkait dengan promise tersebut.

```js
function cancelExample() {
  const controller = new AbortController()

  const promise = waitly(5000, { abortSignal: controller.signal })

  setTimeout(() => {
    waitly.cancelDelay(promise, controller) // Membatalkan delay setelah 1 detik
  }, 1000)

  promise.catch((error) => {
    console.log(error.message) //=> 'Delay dibatalkan'
  })
}

cancelExample()
```

### `waitly.scheduleTask(task, milliseconds)`

Menjadwalkan sebuah fungsi atau tugas asinkron untuk dijalankan setelah delay tertentu.

#### Parameter:

- `task` _(Function)_: Fungsi atau tugas yang akan dijalankan setelah delay.
- `milliseconds` _(Number)_: Waktu delay sebelum tugas dijalankan (harus bernilai non-negatif).

#### Kembalian:

- _(Promise)_: Promise yang selesai setelah tugas dijalankan.

```js
function exampleTask() {
  console.log('Tugas dijalankan!')
}

function scheduleExample() {
  waitly.scheduleTask(exampleTask, 3000).then(() => {
    console.log('Selesai') // 'Tugas dijalankan!' akan dicetak setelah 3 detik
  })
}

scheduleExample()
```
