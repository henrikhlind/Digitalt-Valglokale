const express = require('express');
const session = require('express-session');

const app = express();
const sql = require(__dirname + '/routes/sql.js');

const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { retrieveData } = require('./routes/sql');

// static assets
app.use(express.static(__dirname + '/public'));

// session
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const users = await sql.getUsers();

        const existingUser = users.find((user) => user.id === profile.id);
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = {
          id: profile.id,
        };

        await sql.addUser(newUser.id);

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await sql.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/verify');
}

async function hasVoted(req, res, next) {
  if (await sql.hasVoted(req.session.passport.user)) {
    res.redirect('/confirmed');
  }
  return next();
}

// passport routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/vote', failureRedirect: '/verify' }));

// routes
const routeConfig = [
  { path: '/', middleware: [], file: '/views/index.html' },
  { path: '/verify', middleware: [], file: '/views/pages/verify.html' },
  { path: '/results', middleware: [], file: '/views/pages/results.html' },
  { path: '/vote', middleware: [isAuthenticated, hasVoted], file: '/views/pages/vote.html' },
];

routeConfig.forEach((route) => {
  const { path, middleware, file } = route;
  const middlewareFunctions = middleware.map((middlewareFunction) => (req, res, next) => {
    middlewareFunction(req, res, next);
  });

  app.get(path, ...middlewareFunctions, (req, res) => {
    res.sendFile(__dirname + file);
  });
});

app.get('/confirmed', isAuthenticated, async (req, res) => {
  try {
    const hasVoted = await sql.hasVoted(req.session.passport.user);
    if (hasVoted) {
      // req.logout((err) => {
      //   if (err) {
      //     console.error(err);
      //     res.status(500).json({ error: 'An error occurred while logging the user out.' });
      //   } else {
      res.sendFile(__dirname + '/views/pages/confirmed.html');
      //   }
      // });
    } else {
      res.redirect('/vote');
    }
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: 'An error occurred while checking if the user has voted.' });
  }
});

// sql routes
app.get('/retrieve-data', async (req, res) => {
  try {
    const data = await sql.retrieveData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving data from MSSQL.' });
  }
});

app.get('/increment-vote/:id', async (req, res) => {
  const id = req.params.id;
  if (req.session.passport) {
    try {
      await sql.incrementVote(id, req.session.passport.user);
      res.send(`Incrementing data for ID: ${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while incrementing vote.' });
    }
  } else {
    res.redirect('/verify');
  }
});

// start server
app.listen(process.env.PORT || 3000);
