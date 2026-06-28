import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()


export function createUser(req, res) {
	const hashedPassword = bcrypt.hashSync(req.body.password, 10);

	const user = new User({
		email: req.body.email,
		name: req.body.name,
		password: hashedPassword,
	});

	user
		.save()
		.then(() => {
			res.json({ message: "User created successfully" });
		})
		.catch((error) => {
			res.json({ message: "Error creating user", error: error });
		});
}

export function loginUser(req, res) {
	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (user == null) {
				res.status(404).json({
					message: "User with given email not found",
				});
			} else {

				if(user.isBlocked){
					res.status(403).json({message : "Your account is blocked. Please contact support for more information"})
					return
				}

				const isPasswordValid = bcrypt.compareSync(
					req.body.password,
			 		user.password
				);

				if (isPasswordValid) {

					const token = jwt.sign(
						{
							email: user.email,
							name: user.name,
							role: user.role,
							avatar: user.avatar,
							isEmailVerified: user.isEmailVerified,
						},
						process.env.JWT_SECRET,
                        {
                            expiresIn: req.body.rememberme ? "30d" : "48h"
                    }
					);


					res.json({
						message: "Login successfull",
						token: token,
						role: user.role
					});

				} else {
					res.status(401).json({
						message: "Invalid password",
					});
				}
			}
		})
		.catch(() => {
			res.status(500).json({
				message: "Internal server error",
			});
		});
}

 export async function updateUserProfile(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}
	try {
		await User.updateOne(
			{ email: req.user.email },
			{
				name: req.body.name,
				avatar: req.body.avatar,
			},
		);
		const user = await User.findOne({ email: req.user.email });
		const token = jwt.sign(
			{
				email: user.email,
				name: user.name,
				role: user.role,
				avatar: user.avatar,
			},
			process.env.JWT_SECRET,
			{ expiresIn: req.body.rememberme ? "30d" : "48h" },
		);
		res.json({ message: "Profile updated successfully", token: token });
	} catch (error) {
		res.status(500).json({ message: "Error updating profile", error: error });
	}
}

export async function changeUserPassword(req, res) {
	if (req.user == null) {
		res.status(401).json({
			message: "Unauthorized",
		});
		return;
	}

	try {
		const hashedPassword = bcrypt.hashSync(req.body.password, 10);

		await User.updateOne(
			{ email: req.user.email },
			{ password: hashedPassword },
		);
		res.json({ message: "Password changed successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error changing password", error: error });
	}
}

export function isAdmin(req) {
	if(req.user == null){
		return false
	}

	if(req.user.role == "admin"){
		return true
	} else {
		return false
	}
}

 export function getUser(req,res){
	
	if(req.user == null){
		res.status(401).json({
			message: "Unauthorized"
		})
		return
	}

	res.json({
		email: req.user.email,
		name: req.user.name,
		role: req.user.role,
		avatar: req.user.avatar,	
	})
 }


export async function getAllUsers(req, res){

	if(!isAdmin(req)){
		res.status(403).json({
			message: "Forbidden"
		})
		return
	}
	try{

		const pageSizeInString = req.params.pageSize || "10"

    	const pageNumberInString = req.params.pageNumber || "1"

    	const pageSize = parseInt(pageSizeInString)

    	const pageNumber = parseInt(pageNumberInString)

		const numberOfUsers = await User.countDocuments()

		const numberOfPages = Math.ceil(numberOfUsers / pageSize)

		const users = await User.find({}).skip((pageNumber - 1) * pageSize).limit(pageSize)

		res.json({
			users : users,
			totalPages : numberOfPages
		})

	}catch(error){
		res.status(500).json({message: "Error getting users", error : error})
	}
}

export async function blockOrUnblockUser(req, res){

	if(!isAdmin(req)){
		res.status(403).json({
			message: "Forbidden"
		})
		return
	}
	try{
		const email = req.body.email
		const user = await User.findOne({email : email})

		if(user == null){
			res.status(404).json({message : "user with given email not found"})
			return
		}

		await User.updateOne({email: email}, {isBlocked: !user.isBlocked})

		res.json({message: user.isBlocked? "User unblocked successfully" : "User blocked successfully"})

	}catch(error){
		res.status(500).json({message: "Error blocking/unblocking user", error: error})
	}
}

export async function changeRole(req, res) {
	
	if(!isAdmin(req)){
		res.status(403).json({
			message: "Forbidden"
		})
		return
	}

	const email = req.body.email

	if(req.user.email == email){
		res.status(400).json({
			message: "You cannot change your own role"
		})
		return
	}
	try{
		const user = await User.findOne({email: email})

		if(user == null){
			res.status(404).json({message: "User with given email not found"})
			return
		}
		
		await User.updateOne({email: email}, {role: user.role == "admin" ? "customer" : "admin"})
		res.json({message : user.role == "admin" ? "User role changed to customer successfully" : "User role changed to admin successfully"})
	}catch(error){
		res.status(500).json({message: "Error changing user role", error : error})
	}
}
