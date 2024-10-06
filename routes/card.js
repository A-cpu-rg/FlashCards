const { Router } = require("express");
const multer = require('multer')
const router = Router();
const path = require('path')
const Card = require('../models/card')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })


router.get("/add-new", (req, res) => {
  return res.render("addCard", {
    user: req.user,
  });
});

router.get('/:id',async(req,res)=>{
  const card = await Card.findById(req.params.id).populate('createdBy')

  return res.render('card',{
    user:req.user,
    card,
  })
})

router.post("/", upload.single('coverImage'),async(req, res) => {
  const {title,body} = req.body
  const card = await Card.create({
    body,
    title,
    cretedBy:req.user._id,
    coverImageURL:`uploads/${req.file.filename}`
  })
  return res.redirect(`/card/${card._id}`)
});

module.exports = router