const express = require("express");
const Vigenere = require("caesar-salad").Vigenere;
const app = express();
const port = 8000;

app.use(express.json());

app.post("/encode", (req, res) => {
  const password = req.body.password;
  const codedText = Vigenere.Cipher(password).crypt(req.body.message);
  return res.send("Зашифрованый текст: " + codedText);
});

app.post("/decode", (req, res) => {
  const password = req.body.password;
  const decodedText = Vigenere.Decipher(password).crypt(req.body.message);
  return res.send("Расшифрованый текст: " + decodedText);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
