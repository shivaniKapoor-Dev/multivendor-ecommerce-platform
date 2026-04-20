export const  useAuth = ()=> {
  let token = null;
  let user = null;

  try {
    token = JSON.parse(localStorage.getItem("token"));
  } catch {
    token = localStorage.getItem("token");
  }

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isLoggedIn = !!token ; 
  const role = user?.role || null;

  return {isLoggedIn, user, role}
  
}
