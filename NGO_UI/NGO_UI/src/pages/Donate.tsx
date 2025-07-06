import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationSchema, type DonationFormType } from '@/form/donateForm';

import InputFormField from '@/formFields/InputFormField';
import ComboboxField from '@/formFields/ComboboxField';
import SwitchField from '@/formFields/SwitchField';
import { Button } from '@/components/ui/button';
import { useAddDonationMutation, useDeleteDonationMutation, useEditDonationMutation } from '@/hooks/useDonation';
import { use } from 'react';
import { useUserDetails } from '@/store/useUserStore';

type Props = {
    data?: DonationFormType;
    mode?: string;
    toggle?: (value: boolean) => void;
};

const Donate = ({ data, mode = "add", toggle }: Props) => {
    const userID = useUserDetails((state) => state.userID);

    const donateForm = useForm<DonationFormType>({
        resolver: zodResolver(donationSchema),
        defaultValues: data ? data : {
            pickupRequired: false,
            isPerishable: false,
        },
    });

    const { handleSubmit, watch, reset } = donateForm;
    const pickupRequired = watch('pickupRequired');
    const isPerishable = watch('isPerishable');

    const { mutateAsync: addDonation, isPending } = useAddDonationMutation();

    const { mutateAsync: editDonation } = useEditDonationMutation();

    const { mutateAsync: deleteDonation } = useDeleteDonationMutation();

    const onDonationSubmit = async (data: DonationFormType) => {
        if (mode === "add") {
            await addDonation(data);
            if (toggle) toggle(false);
        } else if (mode === "edit") {
            const payload = { ...data, userID };
            await editDonation(payload);
            if (toggle) toggle(false);
        }
        reset();
    };

    const handleDelete = async () => {
        if (data) {
            const payload = { ...data, userID };
            await deleteDonation(payload);
            if (toggle) toggle(false);
        }
    };

    return (
        <>
            {mode === "delete" ? (
                <Button type="button" className="w-full" onClick={handleDelete}>
                    Delete Donation
                </Button>
            ) : (
                <FormProvider {...donateForm}>
                    <form
                        onSubmit={handleSubmit(onDonationSubmit)}
                        className={`space-y-4 ${mode === "view" ? "pointer-events-none opacity-70" : ""}`}
                    >
                        <InputFormField
                            label="Donor Name"
                            placeholder="Enter your name"
                            name="donorName"
                            required
                        />

                        <ComboboxField
                            name="donorType"
                            options={['public', 'restaurant', 'store', 'company']}
                            label="Type of Donor"
                            placeholder="Select donor type"
                        />

                        <InputFormField
                            label="Contact Number"
                            placeholder="Enter your contact number"
                            name="contactNumber"
                            type="tel"
                            required
                        />

                        <InputFormField
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                        />

                        <InputFormField
                            label="Item Type"
                            placeholder="Enter the item type"
                            name="itemType"
                            type="text"
                            required
                        />

                        <ComboboxField
                            name="foodCategory"
                            options={['raw', 'cooked', 'packaged']}
                            label="Food Category"
                            placeholder="Select food category"
                        />

                        <InputFormField
                            label="Quantity"
                            placeholder="Enter quantity"
                            name="quantity"
                            type="number"
                            required
                        />

                        <ComboboxField
                            name="quantityUnit"
                            options={['kg', 'L', 'packs']}
                            label="Quantity Unit"
                            placeholder="Select quantity unit"
                        />

                        <SwitchField name="pickupRequired" label="Pickup Required?" />
                        <SwitchField name="isPerishable" label="Is Perishable?" />

                        {pickupRequired && (
                            <InputFormField
                                label="Pickup Address"
                                placeholder="Enter pickup address"
                                name="address"
                                required
                            />
                        )}

                        {((!pickupRequired && isPerishable) || (!pickupRequired && !isPerishable)) && (
                            <ComboboxField
                                name="drop_location"
                                options={['center1', 'center2', 'center3']}
                                label="Drop Location"
                                placeholder="Select a drop location"
                            />
                        )}

                        {mode === "edit" && (
                            <ComboboxField
                                name="status"
                                options={["pending", "approved", "picked_up", "delivered", "cancelled"]}
                                label="Status"
                                placeholder="Select status"
                            />
                        )}

                        <InputFormField
                            label="Donate Time"
                            placeholder="Enter preferred Donation time"
                            name="DonateTime"
                            type="datetime-local"
                        />

                        <InputFormField
                            label="Notes"
                            placeholder="Additional notes..."
                            name="notes"
                            type="text"
                            required={false}
                        />

                        {mode === "add" ? (
                            <Button type="submit" className="w-full">
                                {isPending ? "Submitting..." : "Submit Donation"}
                            </Button>
                        ) : mode === "edit" ? (
                            <Button type="submit" className="w-full">
                                Edit Donation
                            </Button>
                        ) : null}
                    </form>
                </FormProvider>
            )}
        </>
    );
};

export default Donate;
