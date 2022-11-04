import {Router}                 from 'express'
import passport                 from "passport";
import { Strategy }             from "passport-local";
import jwt                      from "jsonwebtoken";
import dotenv                   from "dotenv";
import express                  from "express";
import {usuarioApi}             from '../controladores/index.js'

dotenv.config();
const app           = express();
const rutaLogin     = Router()
const LocalStrategy = Strategy;
const PRIVATE_KEY   = process.env.PRIVATE_KEY || "mi_token_secreto";

/*----------- Session -----------*/
/*
app.use(
    session({
      secret: "pepe",
      resave: false,
      saveUninitialized: false,
    })
  );
*/
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(
    new LocalStrategy(
      {usernameField: "email"},
      (email, password, done) => {
      console.log("ingrese a strategy")
      const myusuario = usuarioApi.veoUsuario(email)
      console.log(myusuario)
      if (email == "Diego" && password == "1234")
        return done(null, myusuario);
  
      done(null, false);
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



rutaLogin.post('/', passport.authenticate("local"), (req, res) => {
  try {
      console.log(req.user)
      res.send("estoy")
  } catch (error) {
      res.json(error)
  }

})


export {rutaLogin}