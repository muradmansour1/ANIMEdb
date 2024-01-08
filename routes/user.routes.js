const UserController = require('../controllers/user.controller')
module.exports = app => {
  app.get("/api/users", UserController.findAllUsers)

  app.post("/api/register", UserController.register)

  app.post("/api/login", UserController.login)

  app.get("/api/users/getuser", UserController.getLoggedInUser)

  app.delete("/api/users/:id", UserController.deleteUser)

  app.put("/api/users/:id", UserController.updateUser) 
  
  app.post("/api/favorites/:id", UserController.userFavorites)
} 
