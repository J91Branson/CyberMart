// const passport = require ('passport');
// const router = require("express").Router();

/* GET Google Authentication API. */
router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function (req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3000?token=" + token);
    }
);

// module.exports = router;