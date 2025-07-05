import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { useUserDetails } from '@/store/useUserDetails'
import { CircleUserRound, MessageSquareText, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
    // const userID = useUserDetails((state)=>state.userID)
    // const feedbackURL = Config.FEEDBACK_URL

    return (
        <div className="w-auto bg-primary min-h-12 p-1 space-y-0.5 flex flex-col justify-between items-center md:flex-row">
            {/* logo */}
            <div id="logo" className="flex flex-row text-white space-x-2 items-center">
                <div id="ngo" className='font-bold'>NGO</div>
                <div id="ngo-subtitle" className='font-medium text-xs'>Management</div>
            </div>

            {/* details */}
            <div className='space-x-1 flex items-center flex-col lg:flex-row'>
                <Button variant="link" className='cursor-text text-black' size="sm"><CircleUserRound />{"userID"}</Button>
            </div>
        </div>
    )
}

export default Header