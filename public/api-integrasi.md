# 📄 Rivo Agent API Documentation

## 🔒 Algoritma Enkripsi

```js
CryptoJS.MD5(`${agentId}|${signatureNonce}|${agentKey}|${timestamp}`)
```

Contoh Payload:

```json
{
	"agentId": 1126305,
	"signature": "5c58e093b43ac73dd1503eac053a61c0",
	"signatureNonce": "fb8e34a251a51f3c",
	"timestamp": 1744784406,
	"toUId": 1126305
}
```

Formula Signature:

```
md(1126305|fb8e34a251a51f3c|{agentKey}|1744784406)
```

---

## 📍 1. Antarmuka Pencarian Informasi Pengguna

### Deskripsi

Memeriksa apakah ID pengguna valid.

- ✅ Kode `200` → pengguna ada.
- ❌ Kode lain → pengguna tidak ditemukan.

### URL

`https://apiserver.rivoworldserver.com/v2/third/agent/query-user-info`

### Metode

`POST`

### Parameter

| Nama             | Wajib | Tipe   | Keterangan   |
| ---------------- | ----- | ------ | ------------ |
| `agentId`        | ✅    | number | ID Agen      |
| `signature`      | ✅    | string | Tanda Tangan |
| `signatureNonce` | ✅    | string | String Acak  |
| `timestamp`      | ✅    | number | Timestamp    |
| `toUId`          | ✅    | number | ID Penerima  |

### Contoh Permintaan

```json
{
	"agentId": 1126305,
	"signature": "5c58e093b43ac73dd1503eac053a61c0",
	"signatureNonce": "fb8e34a251a51f3c",
	"timestamp": 1744784406,
	"toUId": 1126305
}
```

### Contoh Respons

```json
{
	"code": "200",
	"msg": "success",
	"avatar": "",
	"nickName": "test"
}
```

---

## 📍 2. Penjualan Koin

### Deskripsi

Transfer koin ke pengguna lain. Kode `200` → transfer sukses.

### URL

`https://apiserver.rivoworldserver.com/v2/third/agent/sell-coin`

### Metode

`POST`

### Parameter

| Nama             | Wajib | Tipe   | Keterangan      |
| ---------------- | ----- | ------ | --------------- |
| `agentId`        | ✅    | number | ID Agen         |
| `toUId`          | ✅    | number | ID Penerima     |
| `coin`           | ✅    | number | Jumlah koin     |
| `orderId`        | ✅    | string | ID pesanan unik |
| `signature`      | ✅    | string | Tanda Tangan    |
| `signatureNonce` | ✅    | string | String Acak     |
| `timestamp`      | ✅    | number | Timestamp       |

### Contoh Permintaan

```json
{
	"agentId": 1126305,
	"coin": 100000,
	"orderId": "1744784840",
	"signature": "033ebd7a54db6d8bb38f3a5b9bce7909",
	"signatureNonce": "277f3efa9194b0df",
	"timestamp": 1744784840,
	"toUId": 1119950
}
```

### Contoh Respons

```json
{
	"code": "200",
	"msg": "success",
	"coinBalance": 22041891355,
	"orderId": "1912392348401192960"
}
```

---

## 📍 3. Cek Saldo Koin Agen

### Deskripsi

Menampilkan saldo koin agen saat ini.

### URL

`https://apiserver.rivoworldserver.com/v2/third/agent/query-coin-balance`

### Metode

`POST`

### Parameter

| Nama             | Wajib | Tipe   | Keterangan   |
| ---------------- | ----- | ------ | ------------ |
| `agentId`        | ✅    | number | ID Agen      |
| `signature`      | ✅    | string | Tanda Tangan |
| `signatureNonce` | ✅    | string | String Acak  |
| `timestamp`      | ✅    | number | Timestamp    |

### Contoh Permintaan

```json
{
	"agentId": 1126305,
	"signature": "033ebd7a54db6d8bb38f3a5b9bce7909",
	"signatureNonce": "277f3efa9194b0df",
	"timestamp": 1744784840
}
```

### Contoh Respons

```json
{
	"code": "200",
	"msg": "success",
	"coinBalance": 22041441355
}
```

---

## 📍 4. Catatan Penjualan Koin

### Deskripsi

Melihat riwayat penjualan koin oleh agen.

### URL

`https://apiserver.rivoworldserver.com/v2/third/agent/sell-coin-record`

### Metode

`POST`

### Parameter

| Nama             | Wajib | Tipe   | Keterangan                    |
| ---------------- | ----- | ------ | ----------------------------- |
| `agentId`        | ✅    | number | ID Agen                       |
| `signature`      | ✅    | string | Tanda Tangan                  |
| `signatureNonce` | ✅    | string | String Acak                   |
| `timestamp`      | ✅    | number | Timestamp                     |
| `page`           | ✅    | number | Halaman (min: 1)              |
| `size`           | ✅    | number | Jumlah per halaman (max: 200) |
| `startTimeTicks` | ❌    | number | Waktu mulai (opsional)        |
| `endTimeTicks`   | ❌    | number | Waktu akhir (opsional)        |
| `toUId`          | ❌    | number | ID Target (opsional)          |
| `orderNum`       | ❌    | string | Nomor Pesanan (opsional)      |

### Contoh Permintaan

```json
{
	"agentId": 1126305,
	"signature": "033ebd7a54db6d8bb38f3a5b9bce7909",
	"signatureNonce": "277f3efa9194b0df",
	"timestamp": 1744784840,
	"page": 1,
	"size": 100
}
```

### Contoh Respons

```json
{
	"code": "200",
	"msg": "success",
	"coinBalance": 22041441355
}
```

### Struktur `records` dalam Respons

| Nama              | Tipe   | Keterangan             |
| ----------------- | ------ | ---------------------- |
| `orderNum`        | string | Nomor Pesanan          |
| `platFormOrderId` | string | Nomor Pesanan Platform |
| `uid`             | string | Transfer ke UID        |
| `coin`            | string | Jumlah Koin            |
| `createTimeTicks` | string | Waktu Pesanan (detik)  |

---

## 📋 Penjelasan Kode Respons

| Kode | Deskripsi           |
| ---- | ------------------- |
| 200  | success             |
| 400  | invalid hash        |
| 401  | duplicated order id |
| 402  | coin not enough     |
| 403  | account not allowed |
| 404  | account not found   |
| 405  | not agent           |
| 500  | unknown error       |
