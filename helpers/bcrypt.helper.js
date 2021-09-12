import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = plainPass => {
  return  bcrypt.hashSync(plainPass, saltRounds);


};

// const comparePassword = (plainPass, hassPassFromDB) => {
//     return bcrypt.compareSync(plainPass, hashPassFromDB);
// }
