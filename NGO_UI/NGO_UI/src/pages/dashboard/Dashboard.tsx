import { Button } from '@/components/ui/button'
import { HeartHandshake } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { donationColumns } from './dashboardTableColumns'
import DialogDynamic from '@/shared/DialogDynamic'
import Donate from '../Donate'
import type { DonationFormType } from '@/form/donateForm'
import { useState } from 'react'
import { useUserDetails } from '@/store/useUserStore'
import { usePaginatedDonations } from '@/hooks/useDonation'
import PaginationControls from '@/shared/Pagination'

const Dashboard = () => {
    const [addDonation, setAddDonation] = useState(false)
    const [selectedData, setSelectedData] = useState<DonationFormType | null>(null);
    const [mode, setMode] = useState<"view" | "edit" | "add" | "delete">("add");

    const [page, setPage] = useState(1);

    const userRole = useUserDetails((state) => state.userRole);
    const userID = useUserDetails((state) => state.userID);

    const { data: getDonation, isLoading } = usePaginatedDonations(userID ?? "", page);

    const handleView = (data: DonationFormType) => {
        setSelectedData(data);
        setMode("view");
        setAddDonation(true);
    };

    const handleEdit = (data: DonationFormType) => {
        setSelectedData(data);
        setMode("edit");
        setAddDonation(true);
    };

    const handleDelete = (data: DonationFormType) => {
        setSelectedData(data);
        setMode("delete");
        setAddDonation(true);
    };

    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>
    }
    return (
        <div className='mx-4'>
            <div className='flex mt-2 items-center justify-end mb-3'>
                <Button variant="default" className='ml-2' onClick={() => {
                    setSelectedData(null);
                    setMode("add");
                    setAddDonation(true);
                }
                }><HeartHandshake /> Donate</Button>
            </div>
            <DialogDynamic
                open={addDonation}
                onOpenChange={setAddDonation}
                title={
                    mode === "view" ? "View Donation" : mode === "edit" ? "Edit Donation" : mode === "delete" ? "Delete Donation" : "New Donation"
                }
                description={
                    mode === "view"
                        ? "Donation details submitted by donor"
                        : mode === "edit"
                            ? "Update donation details"
                            : mode === "delete"
                                ? "Confirm deletion of donation"
                                : "Submit a new donation"
                }
                content={
                    <Donate
                        data={selectedData ?? undefined}
                        mode={mode}
                        toggle={setAddDonation}
                    />
                }
                className="max-h-[calc(100vh-200px)] min-w-full overflow-y-scroll"
            />


            <DataTable columns={donationColumns(handleView, handleEdit, handleDelete, String(userRole))} data={getDonation?.['results'] ?? []} />

            <PaginationControls
                currentPage={getDonation?.current_page ?? page}
                numPages={getDonation?.num_pages ?? 1}
                onPageChange={setPage}
            />
        </div>
    )
}

export default Dashboard