/** @format */
const { Citation } = require("../models");



//Read
exports.findAll = (res) => {
  Citation.findAll()
  .then((citations) => {
    res.send(citations);
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  });
};

//Create
//Requette fonctionne mais aucune données ne rentre dans la table ? 
exports.create = async (req, res) => {
  const { autor, citation } = req.body;
  const newCitation = await new Citation({
    autor,
    citation,
  });
  const saveCitation = newCitation
    .save()
    .then(() => {
      res.json({message:"the quote was created successfully !"});
    })
    .catch((err) => {
      console.log("Error : ", err);
      res.json({
        error: "Registration did not work !",
      });
    });
};


//Update
exports.update = (req, res) => {
  Citation.update({
    autor: req.body.autor,
    citation: req.body.citation
  }, {
    where: { id: req.params.id }
  }, {
    multi: true
  }).then(() => {
    res.json({ message: "Modification completed !"})
  }).catch((err) => {
    console.log("Error : ", err);
  });
}

//Delete 
exports.delete = (req, res) => {
  Citation.destroy({ where: { id: req.params.id } 
  }).then(() => {
    res.json({ message: "Quote delete succefully !"})
  }).catch((err) => {
    console.log("Error : ", err);
    res.json({
      message: "The deletion did not work",
    });
  });
  res.send("Delete");
}