import express                  from "express";
import session                  from "express-session";
import passport                 from "passport";
//import jwt                      from "jsonwebtoken";
import dotenv                   from "dotenv";
import {Router}                 from 'express'
import { Strategy }             from "passport-local";
import {usuarioApi}             from '../controladores/index.js'

dotenv.config();
const app           = express();
const rutaLogin     = Router()
const LocalStrategy = Strategy;
const PRIVATE_KEY   = process.env.PRIVATE_KEY || "mi_token_secreto";

/*----------- Session -----------*/

app.use(
    session({
      secret: PRIVATE_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(
    new LocalStrategy(
      {usernameField: "email",
      passwordField: "pass"},
      async (email, pass, done) => {
      
      const usuario =  await usuarioApi.veoUsuario(email);
      if(!usuario) return done(null, false);

     console.log(usuario) 
     done(null, usuario); 
    })
  );

  //serializar
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  
  //deserializar
  passport.deserializeUser(function (id, done) {
    done(null, user);
  });

  function auth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send("login-error");
    }
  }  

  rutaLogin.post("/", passport.authenticate("local"), (req, res) => {
    if (!req.user) {
      res.send("login-error");
    } else {
      res.send("/datos");
    }
  });


export {rutaLogin}