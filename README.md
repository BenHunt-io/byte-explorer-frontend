This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Encoding and Decoding

**Encoding & Decoding != Encryption & Decryption**

Decoding is a process in which you change the way the information is represented, typically lifting information up from binary into something that is more meaningful at a higher level. The underlying information does not change, but the way you read it does. Decoding puts information into a new format that is more digestable by whatever system that is consuming it.

For example, for huamns, we tend to like to view information in our native language. For me, this is English.
The sentence can `"The brown fox jumps over the lazy dog"` can be represented (encoded) by a sequence of binary digits:
```
101010011010001100101100000110001011100101101111111011111011101000001100110110111111110001000001101010111010111011011110000111001110000011011111110110110010111100101000001110100110100011001011000001101100110000111110101111001100000110010011011111100111
```
This obviously isn't intelligible, but it is in a format *machines* can understand. It's easier to see with an array of bytes, how each byte can map uniquely back to a character. This mapping of bytes to characters is known as an **encoding**. The most commonly used character encoding used today is `ascii`.

```
[1010100 1101000 1100101 100000 1100010 1110010 1101111 1110111 1101110 100000 1100110 1101111 1111000 100000 1101010 1110101 1101101 1110000 1110011 100000 1101111 1110110 1100101 1110010 100000 1110100 1101000 1100101 100000 1101100 1100001 1111010 1111001 100000 1100100 1101111 1100111]
```

When we lift this binary data up into something that is more consumable, `"The brown fox jumps over the lazy dog"`, we decode it. We process all the bytes, and for each byte we look up what unique character is mapped to it.

### Encoding & Decoding Bitcoin

**Variable Length Encoding**: Allows for an encoding to be dynamic instead of static. Data usually consists of parts, delimited by something. In the case of words, groups of information is delimited by a space. When information is encoded into binary, for example `"100010101010101010000101010"`, the person interpreting that information needs to know where parts of that data starts and ends. If parts of the information are variable length, there is no way of knowing.. unless you encode some statically sized information that says how long the variable length part is.
- [VarInt](https://learnmeabitcoin.com/technical/varint) is the way bitcoin achieves variable length encoding.



