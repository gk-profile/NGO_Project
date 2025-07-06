import { Button } from '@/components/ui/button'
import { useUserDetails } from '@/store/useUserStore'
import { User } from 'lucide-react'

const Header = () => {
    const userID = useUserDetails((state)=>state.userID)
    const useRole = useUserDetails((state)=>state.userRole)

    return (
        <div className="w-auto bg-[#43A047] min-h-12 px-4 space-y-0.5 flex flex-col justify-between items-center md:flex-row">
            {/* logo */}
            <div id="logo" className="flex flex-row text-white space-x-2 items-center">
                <div id="ngo" className='font-bold '>NGO</div>
            </div>

            {/* details */}
            <div className='space-x-1 flex items-center flex-col lg:flex-row'>
                <Button variant="link" className='cursor-text items-center text-white font-medium' size="sm"><User/>{userID}({useRole})</Button>
            </div>
        </div>
    )
}

export default Header