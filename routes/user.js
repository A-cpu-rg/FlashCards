const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Authentication Error:", error.message);

    return res
      .status(401)
      .render("signin", { error: "Invalid email or password." });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("signin");
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
    return res
      .status(400)
      .render("signup", {
        error: "Failed to create account. Email may already be in use.",
      });
  }
});


router.get('/logout',(req,res)=>{
  res.clearCookie("token").redirect('/landing')
})


module.exports = router;
