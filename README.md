# Swift Protocol Workshop @ Nebular Hack Day 2023

## Frontend

### Importing the package

To use Guard on the frontend, you need to install the Guard package.

```zsh
yarn add @swiftprotocol/guard
```

Then, import the Guard constructor.

```javascript
import Guard from '@swiftprotocol/guard'
```

### Constructing the Guard object

By default, Guard supports `keplr`, `leap` and `comostation` as wallets, both referring to `window.<wallet>` or `window.<wallet>.providers.keplr`. You can initialize a Guard object using any of the two wallets like so:

```javascript
const guard = new Guard({
  api: 'https://guard.swiftprotocol.zone',
  wallet: 'keplr',
})
```

You can also use an unsupported wallet type by providing an address, hex-encoded public key and signArbitrary method conforming with the [Keplr API signArbitrary method](https://docs.keplr.app/api/#request-signature-for-arbitrary-message). You could technically also do this with Keplr and Leap in apps that support more than just the two base wallets.

You can see how to implement this roughly [here](https://github.com/swiftprotocol/guard/blob/a616804ef90623266de86e23814d57cd869f24a4/tests/guard.test.ts#L54).

```javascript
const guard = new Guard({
  api: "https://guard.swiftprotocol.zone",
  chainId: "stargaze-1",
  account: {
    address: "stars1...",
    hexPubKey: "0x..." // Hex-encoded public key
  },
  walletMethods: {
    signArbitrary: () => // Your signArbitrary wrapper function here
  }
});
```

### Storing data

When a user provides their email on your notification form, store it for them like so:

```javascript
guard.put('email', value)
```

### Granting authorization

Once you've stored the email, grant your app an authorization to send notifications to this email like so:

```javascript
guard.notifyAuthorize('nebular')
```

In this case, the app ID is `nebular`. When provisioning your app with us, you will receive an API key and an app ID. **NEVER** store the API key on the frontend or share it with a third party. Only use it when interacting with the Guard API on the backend.

## Backend

### Calling `notify`

Notifying a user is as simple as a `POST` request.

Here's how you would do this in JavaScript using Axios:

```javascript
axios.post(
  'https://guard.swiftprotocol.zone/notify/juno1...',
  {
    title: 'My Notification', // Title of your notification
    content: '<p>Hello world!</p>', // HTML content of your notification
  },
  {
    headers: {
      'Content-Type': 'application/json',
      Authorization: '<your api key here>',
    },
  },
)
```
