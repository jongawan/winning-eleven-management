// // middleware/authenticate.js
// const isPlayer = (req, res, next) => {
//     // Periksa apakah pengguna sudah login
//     if (req.session.Users) {
//       if (req.session.Users.role == "player") {
//         return next(); // Lanjutkan jika sudah otentikasi
//       }
//       req.flash("errors", "anda tidak memiliki akses");
//       return res.redirect("/login");
//     }
  
//     // Redirect atau tanggapan lain jika belum otentikasi
//     res.redirect("/login");
//   };
  
//   module.exports = isPlayer;