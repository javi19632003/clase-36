import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true, max: 80 },
  email: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 80 },
  telefono: { type: String, required: true, max: 25 },
  pass: { type: String, required: true, max: 25 },
  edad: { type: Number, required: true },
  foto: { type: String, required: true, max: 150 },
}, {
  versionKey: false 
});


export const usuarios = mongoose.model(
  usuariosCollection,
  usuariosSchema
);
