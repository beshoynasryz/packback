import bcrypt from 'bcryptjs';
export const Compare = async ({ key, hash }) => {
	return await bcrypt.compareSync(key, hash);
};
