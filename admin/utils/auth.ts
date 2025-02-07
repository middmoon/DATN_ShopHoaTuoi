export const hasRole = (userRoles: string[], allowedRoles: string[]): boolean => {
  return userRoles.some((role) => allowedRoles.includes(role));
};
