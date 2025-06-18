import bcrypt from 'bcryptjs';

export const Hash = async ({ key, SALT_ROUNDS = process.env.SALT_ROUNDS }) => {
	const salt = await bcrypt.genSalt(10);
	return salt;
};
