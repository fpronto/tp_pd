const express = require("express");
const { join } = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.connect("mongodb://mongodb:27017/tp_pd", { useNewUrlParser: true });

app.use(morgan("common"));
app.use(cors());

app.use(express.json({ limit: "50mb" }));

require("./Schemas/Document");
const Document = mongoose.model("documents");

app.get("/documents", async (req, res) => {
  const documents = await Document.find();
  res.status(200).json(documents);
});

app.get("/documents/:id", async (req, res) => {
  const document = await Document.findOne({ _id: req.params.id });
  if (document === undefined) {
    return res.status(404).json(document);
  }
  res.status(200).json(document);
});

app.put("/documents/:id", async (req, res) => {
  const document = await Document.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    },
    { useFindAndModify: false }
  );
  res.status(200).json(document);
});

app.post("/documents", async (req, res) => {
  const errors = {};
  if (
    !req.body.title ||
    typeof req.body.title === undefined ||
    req.body.title === null ||
    req.body.title.trim() === ""
  ) {
    errors.title = "Título inválido";
  }

  if (
    !req.body.content ||
    typeof req.body.content === undefined ||
    req.body.content === null ||
    req.body.content.trim() === ""
  ) {
    errors.content = "Conteúdo inválido";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  let document = {
    title: req.body.title.replace(/\s\s+/g, " ").replace(/\s*$/, ""),
    content: req.body.content.replace(/\s\s+/g, " ").replace(/\s*$/, ""),
  };

  document = await new Document(document).save();
  res.status(200).json(document);
});

app.delete("/documents/:id", async (req, res) => {
  const document = await Document.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(document);
});

//setting middleware
app.use(express.static(join(__dirname, "build"))); //Serves resources from public folder

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
