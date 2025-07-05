import Header from '@/layout/Header'
import { Navigate, Outlet } from 'react-router-dom'

const ValidateUser = () => {
    const token = localStorage.getItem('token')
    // const { data, isPending, error, isError } = useValidateToken()
    // const setUserID = useUserDetails((state) => state.setUserID)

    if (!token) {
        return <Navigate to={'/login'} replace />
    }

    // if (error) return <Navigate to={'/login'} replace />

    // if (data) setUserID(data.username)

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default ValidateUser