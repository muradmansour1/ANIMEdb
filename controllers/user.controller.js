const User = require('../models/user_model')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRETKEY

class UserController{
	findAllUsers = (req,res) =>{
		User.find()
			.then(allUsers => {
				res.json({results: allUsers})
			})
			.catch(err => {
				res.json({message: "User not found"})
			})
	}
	register = (req,res) =>{
		User.find({email: req.body.email})
			.then(userEmail =>{
				if(userEmail.length === 0){
					User.create(req.body)
						.then(user => {
							//when the .then() happens that means that user from the form was created successfully and is stored in that variable "user" which has info about the user that was just put into the db, including the field _id
							const userToken = jwt.sign({
								id: user._id
							}, secret);

							//respond with a cookie called "JWT" which contains the JWT from above called userTokenJWT AND also responds with json with info about the user who just got created.
							res
								.cookie("usertoken", userToken, secret, {
									httpOnly: true
								})
								.json({message: "success!", user: user})
						})
						.catch(err =>{
							res.json(err)
						})
				}else{
					res.json({errors: {email: {message: "Email has been used"}}})
				}
			})
			.catch(err => {
				console.log("err --> ",err)
			})
	}
	login = async(req, res) =>{
		const user = await User.findOne({email: req.body.email})
		if(user === null){
			return res.json({errors: "User not found!"})
		}
		
		//if we made it this far then user has logged in succesfully!
		const userToken = jwt.sign({
			id: user._id,
		}, secret);
		
		res
			// .cookie("usertoken", userToken, secret, {
			// 	httpOnly: true
			// })
		.json({message: "success!", token:userToken, user: user})
	}
	getLoggedInUser = (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization;
				console.log('req.headers --->', req.headers)
				console.log('token --> ', token);
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }
        // Decode the JWT token
        const decodedJwt = jwt.verify(token, secret); // Adjust the 'secret' as per your configuration
        User.findOne({ _id: decodedJwt.id })
            .then(foundUser => {
                res.json({ results: { id: foundUser.id, username: foundUser.username, email: foundUser.email, favorites: foundUser.favorites } });
            })
            .catch(err => res.status(500).json({ msg: "something went wrong!", error: err }));
    } catch (error) {
        res.status(500).json({ msg: "Error decoding token", error });
    }
};
	// getLoggedInUser = (req, res)=>{
	// 	//use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id, and return with info about the logged in user.
	// 	const decodeJwt = jwt.decode(req.cookies.usertoken, {complete: true})
	// 	User.findOne({ _id: decodeJwt.payload.id})
	// 		.then(foundUser =>{
	// 			res.json({ results: {id: foundUser.id, username: foundUser.username, email: foundUser.email, favorites: foundUser.favorites}})
	// 		})
	// 		.catch(err => res.json({msg: "something went wrong!", error: err}))
	// }

	deleteUser = (req, res)=>{
		User.deleteOne({_id: req.params.id})
			.then(deletedUser =>{
				res.json({results: deletedUser})
			})
			.catch(err => res.json({msg: "something went wrong", error: err}))
	}

	updateUser = (req, res)=>{
		User.find({email: req.body.email})
			.then(userEmail =>{
				if(userEmail.length === 0){
					User.findOneAndUpdate(
						{ _id: req.params.id },
						req.body, 
						{ new: true, runValidators: true }
					)
						.then(updatedUser =>{
							res.json({ results: updatedUser })
						})
						.catch(err => res.json({ msg: "Something Went Wrong!", error: err }))
				}else{
					res.json({errors: {email: {message: "Email has been used"}}})
				}
			})
	}

	userFavorite = (req, res) => {
		const userId = req.params.id;
		const animeInfo = req.body;

		User.findById(userId)
				.then(user => {
						if (!user) {
								return res.status(404).json({ error: 'User not found' });
						}

						// Check if the anime is already in favorites
						const isFavorite = user.favorites.some(favorite => favorite.animeID === animeInfo.animeID);

						if (!isFavorite) {
								// Add the anime to the user's favorites
								user.favorites.push(animeInfo);

								return user.save()
								.then(updatedUser => {
									res.status(200).json(updatedUser);
							})
							.catch(saveError => {
									console.error('Error saving user:', saveError.message);
									res.status(500).json({ error: 'Internal Server Error' });
							});
						} else {
							// Anime is already in favorites
							res.status(200).json({ msg: 'Anime is already in favorites', user });
					}
			})
			.catch(error => {
					console.error('Error finding user:', error.message);
					res.status(500).json({ error: 'Internal Server Error' });
			});
	};

	deleteFavorite = (req, res) => {
        const userId = req.params.id;
        const animeInfo = req.body;

        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
    
                // Check if the anime is already in favorites
                const isFavorite = user.favorites.some(favorite => favorite.animeID === animeInfo.animeID);

								if (!isFavorite) {
									user.favorites.pop(animeInfo);
	
									return user.save()
											.then(updatedUser => {
													res.status(200).json(updatedUser);
											})
											.catch(saveError => {
													console.error('Error saving user:', saveError.message);
													res.status(500).json({ error: 'Internal Server Error' });
											});
							} else {
									// Anime is already in favorites
									res.status(200).json({ msg: 'Anime is not in favorites', user });
							}
					})
					.catch(error => {
						console.error('Error finding user:', error.message);
						res.status(500).json({ error: 'Internal Server Error' });
				});
};
	
	
}

module.exports = new UserController()