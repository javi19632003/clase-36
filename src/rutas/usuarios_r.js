import passport                 from "passport";
import jwt                      from "jsonwebtoken";
import dotenv                   from "dotenv";
import {Router}                 from 'express'


dotenv.config();
const rutaUsuarios  = Router()
const PRIVATE_KEY   = process.env.PRIVATE_KEY || "mi_token_secreto";

/*----------- Session -----------*/  


  rutaUsuarios.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(req.user);
    const { email, nombre } = req.user;
    
    const userForToken = {
      email,
      nombre,
    };
    const token = jwt.sign(userForToken, PRIVATE_KEY);
    
    res.json({
      token,
    });

  });
  
  rutaUsuarios.post("/alta", (req, res) => {
    
  });



export {rutaUsuarios}