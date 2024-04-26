require("../models/connection");

const bcrypt = require("bcrypt");
const uid2 = require("uid2");

const User = require("../models/users");

// Inscription utilisateur
exports.signup = (req, res) => {
  if (req.body.firstname && req.body.email && req.body.password) {
    // Vérifier si l'utilisateur existe déjà
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.json({ result: false, error: "L'utilisateur existe déjà." });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          firstname: req.body.firstname,
          email: req.body.email,
          password: hash,
          token: uid2(32),
          avatar: "",
          favoriteCategories: [],
          likedEvents: [],
        });

        newUser.save().then((user) => {
          res.json({ result: true, token: user.token, id: user._id, email: user.email, firstname: user.firstname });
        });
      }
    });
  } else {
    res.json({ result: false, error: "Champs manquants ou vides." });
  }
};

// Connexion utilisateur
exports.signin = (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        // L'utilisateur existe, vérification du password
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Utilisateur connecté
          res.json({ result: true, token: user.token, id: user._id, email: user.email, firstname: user.firstname });
        } else {
          res.json({ result: false, error: "Utilisateur introuvable ou mot de passe incorrect." });
        }
      } else {
        res.json({ result: false, error: "Utilisateur introuvable ou mot de passe incorrect." });
      }
    });
  } else {
    res.json({ result: false, error: "Champs manquants ou vides." });
  }
};

// Mettre en favoris un event
exports.likeEvent = (req, res) => {
  User.findOne({ token: req.params.token }).then(user => {
    if (user) {

      if (user.likedEvents.includes(req.params.eventId)) {
        User.updateOne({ token: req.params.token  }, { $pull: { likedEvents: req.params.eventId } }).then(() => {
          res.json({ result: true, message: 'Event supprimé de la liste des likes.' })
        })
      } else {
        User.updateOne({ token: req.params.token  }, { $push: { likedEvents: req.params.eventId } }).then(() => {
          res.json({ result: true, message: 'Event ajouté à la liste des likes.' });
        })
      }

    } else {
      res.json({ result: false, error: 'User not found' });
    }
  })
};

// Récupérer la liste des events que l'utilisateur à mis en favoris
exports.loadEvent = (req, res) => {
  User.findOne({ token: req.params.token }).then(user => {
    if (user) {
      res.json({ result: true, eventsLiked: user.likedEvents });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  })
}
