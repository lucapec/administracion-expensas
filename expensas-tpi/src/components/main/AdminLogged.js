import { useAuth } from "../context/AuthContextProvider"

const AdminLogged = () => {
  const auth = useAuth();
    return (
    <div>hola {auth.currentUser.name}</div>
  )
}

export default AdminLogged