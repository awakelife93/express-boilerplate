import bcrypt from "bcryptjs";

export const hashSync = (data: string, saltRounds: number = 10): string => {
  return bcrypt.hashSync(data, saltRounds);
};

export const compareSync = (oldHash: string, newHash: string): boolean => {
  return bcrypt.compareSync(oldHash, newHash);
};
