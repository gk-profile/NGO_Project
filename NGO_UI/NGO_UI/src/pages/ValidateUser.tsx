
import { useValidateToken } from '@/hooks/useAuth'
import Header from '@/layout/Header'
import { useUserDetails } from '@/store/useUserStore'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ValidateUser = () => {
    const token = localStorage.getItem('token')

    const { data, isPending, error } = useValidateToken();

    const setUserID = useUserDetails((state) => state.setUserID)
    const setUserRole = useUserDetails((state) => state.setUserRole)

    useEffect(() => {
        if (data) {
            setUserID(data.username)
            setUserRole(data.role)
        }
    }, [data, setUserID, setUserRole])

    if (!token) {
        return <Navigate to={'/login'} replace />
    }

    if (isPending) {
        return <p className='flex justify-center items-center h-screen'>Loading...</p>
    }

    if (error) {
        return <Navigate to={'/login'} replace />
    }

    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default ValidateUser;
