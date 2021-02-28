// Express routes for a CRUD API
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

// region: schema
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const albumSchema = mongoose.Schema({
  performer: String,
  title: String,
  cost: Number,
});
const Album = mongoose.model('Album', albumSchema);

const purchaseSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  album: {type: mongoose.Schema.Types.ObjectId, ref: 'Album'},
});
const Purchase = mongoose.model('Purchase', purchaseSchema);
// endregion

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'root',
  pass: 'password',
}).then(() => {
  app.listen(3000);
}).catch((error) => {
  console.error(error);
  throw error;
});

// region: middlewares
async function authMiddleware(req, res, next) {
  const token = req.headers['authorization'] || '';
  if (!token.length) {
    res.sendStatus(401);
  } else {
    const user = await User.findOne({
      password: token,
    });
    if (!user) {
      res.sendStatus(401);
    } else {
      next();
    }
  }
}

// endregion

// region: endpoints
// region: albums
app.get('/albums', authMiddleware, async (req, res) => {
  try {
    const albums = await Album.find();
    res.send({data: albums});
  } catch (e) {
    console.error(e);
    res.send({data: []});
  }
});

app.get('/albums/:id', authMiddleware, async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      res.sendStatus(404);
    }
    res.status(200).send({data: album});
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
});

app.post('/albums', authMiddleware, async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).send({data: album});
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

app.put('/albums/:id', authMiddleware, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    if (!album) {
      res.sendStatus(404);
    } else {
      res.send(album);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

app.delete('/albums/:id', authMiddleware, async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
});
// endregion

app.post('/signup', async (req, res) => {
  try {
    const user = await User.create({
      ...req.body,
      password: crypto.createHash('sha512', req.body.password).digest('base64'),
    });
    res.status(201).header('authorization', user.password).send({data: user});
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.sendStatus(401);
    } else {
      const hash = crypto
          .createHash('sha512', req.body.password)
          .digest('base64');
      const user = await User.findOne({
        email: req.body.email || '',
        password: hash,
      });
      if (!user) {
        res.sendStatus(401);
      } else {
        res.header('authorization', user.password).send(user);
      }
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(401);
  }
});

app.post('/logout', (req, res) => {
  res.status(204);
  res.removeHeader('authorization');
  delete req.headers['authorization'];
  res.end();
});

app.post('/purchases', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      res.status(404).send({
        error: {
          message: `Cannot find user by id ${req.body.user}`,
        },
      });
    }
    const album = await Album.findById(req.body.album);
    if (!album) {
      res.status(404).send({
        error: {
          message: `Cannot find album by id ${req.body.album}`,
        },
      });
    }
    const purchase = await Purchase.create(req.body);
    if (purchase) {
      res.status(201).send({
        _id: purchase.id,
        __v: purchase.__v,
        user,
        album,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});
// endregion
