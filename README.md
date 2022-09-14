
## Auth Server
Based on Private Key and Public Key JWT

### ToDo
* ~~Auth (Sign In and get Auth Token)~~
* ~~Create User~~
* Blacklist (Logout) User
* Update User
* Delete User
* Permissions?

### Generate Keys
Generate inside the `artifacts` folder

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
// Don't add passphrase

openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

cat jwtRS256.key
cat jwtRS256.key.pub
```

### References
* https://github.com/auth0/node-jsonwebtoken#readme
* https://github.com/cornflourblue/next-js-11-jwt-authentication-example
* https://www.prisma.io/docs/concepts/components/prisma-client/crud
* https://jasonwatmore.com/post/2021/08/20/next-js-api-add-middleware-to-api-routes-example-tutorial
* https://www.npmjs.com/package/otp-generator

