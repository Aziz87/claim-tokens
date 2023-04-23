- Rename folder `secrets_example` to `secrets`

- Add your address/privateKeys to file `wallets_for_linea`

```json
// Example
[
  {
    "a": "0x33E9a7fB741CA1d08400A6BeF4DC82EfE930c0F2",
    "p": "0x56221a0ef98f592987e6872c190c5feeb9089be867a278f196239898af95861c"
  },
  {
    "a": "0x09EF7971E55d3A9c9e20f2DF3c80c15AF0C423CA",
    "p": "0xe2e12ad9babcda948200b489fc711e2a17638a2df04951d5c3af8640cdec000"
  }
]
```

- run command for install all dependeses

```
npm install
```

- create file .env in the project folder
  and add variable
  donor = 'your_donor_privatekey'

- go to folder `Linea`, for use Linea claim methods:

```ts
// for send eth to all your wallets
ts-node donor.ts

// for claim
ts-node claim.ts
```
