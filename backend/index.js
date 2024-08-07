const express = require("express");
const Vigenere = require("caesar-salad").Vigenere;
const app = express();
const port = 8000;
const password = "password";

app.get("/:text", (req, res) => {
  return res.send(req.params.text);
});

app.get("/encode/:text", (req, res) => {
  const codedText = Vigenere.Cipher(password).crypt(req.params.text);
  return res.send("Зашифрованый текст: " + codedText);
});

app.get("/decode/:text", (req, res) => {
  const decodedText = Vigenere.Decipher(password).crypt(req.params.text);
  return res.send("Расшифрованый текст: " + decodedText);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
