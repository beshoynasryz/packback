import User from './user.model';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { Hash } from '../../utils/Hash/index.js';

export const createUser = expressAsyncHandler(async (req, res, next) => {
	const { name, email, password, phone, role } = req.body;

	if (!name || !email || !password || !phone) {
		return next(new Error('All fields are required'));
	}
	const existingUser = User.findOne({ email });
	if (existingUser) {
		return res.status(400).send({ message: 'User is already exists' });
	}
	const hashedPassword = await Hash({
		key: password,
		SALT_ROUNDS: process.env.SALT_ROUNDS
	});

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		phone,
		role
	});
	const { password: _, ...userWithoutPassowrd } = user.toObject();

	res.status(201).json({
		success: true,
		message: 'User created successfully',
		data: userWithoutPassowrd
	});
});
export const getUserById = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		return next(new Error('User ID is required'));
	}

	const user = await User.findById(id).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		data: user
	});
});
export const updateUser = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { name, email, phone, role } = req.body;

	if (!id) {
		return next(new Error('User ID is required'));
	}

	const user = await User.findByIdAndUpdate(
		id,
		{ name, email, phone, role },
		{ new: true, runValidators: true }
	).select('-password');
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}
	res.status(200).json({
		success: true,
		message: 'User updated successfully',
		data: user
	});
});
export const deleteUser = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		return next(new Error('User ID is required'));
	}

	const user = await User.findByIdAndDelete(id);
	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		message: 'User deleted successfully'
	});
});
export const getAllUsers = expressAsyncHandler(async (req, res, next) => {
	const users = await User.find().select('-password');

	if (!users || users.length === 0) {
		return res.status(404).json({ message: 'No users found' });
	}

	res.status(200).json({
		success: true,
		data: users
	});
});
export const getUserProfile = expressAsyncHandler(async (req, res, next) => {
	const userId = req.user._id;

	if (!userId) {
		return next(new Error('User ID is required'));
	}

	const user = await User.findById(userId).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		data: user
	});
});
export const updateUserProfile = expressAsyncHandler(async (req, res, next) => {
	const userId = req.user._id;
	const { name, email, phone } = req.body;

	if (!userId) {
		return next(new Error('User ID is required'));
	}

	const user = await User.findByIdAndUpdate(
		userId,
		{ name, email, phone },
		{ new: true, runValidators: true }
	).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		message: 'User profile updated successfully',
		data: user
	});
});
export const changeUserPassword = expressAsyncHandler(
	async (req, res, next) => {
		const userId = req.user._id;
		const { oldPassword, newPassword } = req.body;

		if (!userId || !oldPassword || !newPassword) {
			return next(
				new Error('User ID, old password, and new password are required')
			);
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Old password is incorrect' });
		}

		const hashedNewPassword = await Hash({
			key: newPassword,
			SALT_ROUNDS: process.env.SALT_ROUNDS
		});

		user.password = hashedNewPassword;
		await user.save();

		res.status(200).json({
			success: true,
			message: 'Password changed successfully'
		});
	}
);
export const getUserByEmail = expressAsyncHandler(async (req, res, next) => {
	const { email } = req.params;

	if (!email) {
		return next(new Error('Email is required'));
	}

	const user = await User.findOne({ email }).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		data: user
	});
});
export const getUserByPhone = expressAsyncHandler(async (req, res, next) => {
	const { phone } = req.params;

	if (!phone) {
		return next(new Error('Phone number is required'));
	}

	const user = await User.findOne({ phone }).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		data: user
	});
});
export const getUserByRole = expressAsyncHandler(async (req, res, next) => {
	const { role } = req.params;

	if (!role) {
		return next(new Error('Role is required'));
	}

	const users = await User.find({ role }).select('-password');

	if (!users || users.length === 0) {
		return res.status(404).json({ message: 'No users found with this role' });
	}

	res.status(200).json({
		success: true,
		data: users
	});
});
export const updateUserRole = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { role } = req.body;

	if (!id || !role) {
		return next(new Error('User ID and role are required'));
	}

	const user = await User.findByIdAndUpdate(
		id,
		{ role },
		{ new: true, runValidators: true }
	).select('-password');

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	res.status(200).json({
		success: true,
		message: 'User role updated successfully',
		data: user
	});
});
export const getUserCount = expressAsyncHandler(async (req, res, next) => {
	const userCount = await User.countDocuments();

	res.status(200).json({
		success: true,
		data: { count: userCount }
	});
});
