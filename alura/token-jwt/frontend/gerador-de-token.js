const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "3oqUJ3v7XaM5HvZyPod5WFHaexP8sib2";

const nossoToken = jwt.sign(
  {
    name: "Guilherme",
  },
  SECRET_KEY,
  {
    expiresIn: "10s",
  }
);

console.log(nossoToken);
