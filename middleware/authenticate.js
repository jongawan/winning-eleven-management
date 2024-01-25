// // middleware/authenticate.js
// const isAuthenticated = (req, res, next) => {
//     // Periksa apakah pengguna sudah login
//     if (req.session.Users) {
//       return next(); // Lanjutkan jika sudah otentikasi
//     }
  
//     // Redirect atau tanggapan lain jika belum otentikasi
//     res.redirect('/login');
//   };
  
//   module.exports = isAuthenticated;