export default function authHeader() {
  const user = localStorage.getItem('user');

  if (user) {
    return { Authorization: user, 'Content-Type': 'application/json;charset=utf-8' };
  }
  return {};
}
