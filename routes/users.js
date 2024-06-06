const express = require("express");
const router = express.Router();

const usersCtrl = require("../controllers/users");

// Inscription utilisateur
router.post("/signup", usersCtrl.signup);
// Connexion utilisateur
router.post("/signin", usersCtrl.signin);
// Mettre en favoris un event
router.put("/like/:token/:eventId", usersCtrl.likeEvent);
// Récupérer la liste des events que l'utilisateur à mis en favoris
router.get("/like/:token", usersCtrl.loadEvent);
// Modifier sa photo de profil
router.post("/upload/:token", usersCtrl.uploadImage)

module.exports = router;
