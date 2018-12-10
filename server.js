const express = require('express');
require('dotenv').config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header
    // and the signign keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minutee
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
            }/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,

    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    // This must match the algorihtm selecetd in the the Auth0 dashboard under your app's advanced settings under the OAuth tab
    algorithms: ["RS256"]
});

const app = express();

app.get('/public', function (req, res) {
    res.json({
        message: "Hello from a public API!"
    });
});


app.get("/private", checkJwt, function (req, res) {
    res.json({
        message: "Hello from a private API!"
    });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
