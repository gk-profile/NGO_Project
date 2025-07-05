import Filter from '../Filter'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { donationColumns } from './dashboardTableColumns'
import DialogDynamic from '@/shared/DialogDynamic'
import Donate from '../Donate'
import type { DonationFormType } from '@/form/donateForm'
import { useState } from 'react'

type Donation = {
    donorName: string;
    donorType: "public" | "restaurant" | "store" | "company";
    contactNumber: string;
    email: string;
    itemType: string;
    foodCategory: "raw" | "cooked" | "packaged";
    quantity: number;
    quantityUnit: "kg" | "packs" | "L";
    pickupRequired: boolean;
    isPerishable: boolean;
    address: string | undefined;
    pickupTime: string | undefined;
    dropLocation: "center1" | "center2" | "center3" | undefined;
    notes?: string;
};

const apiResponse: Donation[] = [
    {
        donorName: "kf",
        donorType: "public",
        contactNumber: "9500269372",
        email: "g@gmail.com",
        itemType: "rice",
        foodCategory: "raw",
        quantity: 5,
        quantityUnit: "kg",
        pickupRequired: true,
        isPerishable: true,
        address: "kjdksldk",
        pickupTime: "2025-07-05T17:39",
        dropLocation: undefined,
        notes: "jasdalkd"
    },
    {
        donorName: "Green Bites Cafe",
        donorType: "restaurant",
        contactNumber: "9876543210",
        email: "manager@greenbites.com",
        itemType: "cooked meals",
        foodCategory: "cooked",
        quantity: 20,
        quantityUnit: "packs",
        pickupRequired: false,
        isPerishable: true,
        address: undefined,
        pickupTime: undefined,
        dropLocation: "center1",
        notes: "Packaged and labeled with expiry"
    },
    {
        donorName: "FreshMart Grocery",
        donorType: "store",
        contactNumber: "9123456789",
        email: "contact@freshmart.in",
        itemType: "milk cartons",
        foodCategory: "packaged",
        quantity: 10,
        quantityUnit: "L",
        pickupRequired: true,
        isPerishable: false,
        address: "No. 42, Anna Nagar West, Chennai",
        pickupTime: "2025-07-06T10:00",
        dropLocation: undefined,
        notes: "Keep refrigerated during transit"
    }
]


const Dashboard = () => {
    const [addDonation, setAddDonation] = useState(false)
    const [selectedData, setSelectedData] = useState<DonationFormType | null>(null);
    const [mode, setMode] = useState<"view" | "edit" | "add">("add");

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
    return (
        <div className='mx-4'>
            <div className='flex mt-2 items-center justify-between mb-3'>
                <Filter />
                <Button variant="default" className='ml-2' onClick={() => {
                    setSelectedData(null);
                    setMode("add");
                    setAddDonation(true);
                }
                }><Plus /> Donate</Button>
            </div>
            <DialogDynamic
                open={addDonation}
                onOpenChange={setAddDonation}
                title={
                    mode === "view" ? "View Donation" : mode === "edit" ? "Edit Donation" : "New Donation"
                }
                description={
                    mode === "view"
                        ? "Donation details submitted by donor"
                        : mode === "edit"
                            ? "Update donation details"
                            : "Submit a new donation"
                }
                content={
                    <Donate
                        data={selectedData ?? undefined}
                        mode={mode}
                    />
                }
                className="max-h-[calc(100vh-200px)] min-w-full overflow-y-scroll"
            />


            <DataTable columns={donationColumns(handleView, handleEdit)} data={apiResponse} />
        </div>
    )
}

export default Dashboard