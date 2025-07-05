import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationSchema, type DonationFormType } from '@/form/donateForm';

import InputFormField from '@/formFields/InputFormField';
import ComboboxField from '@/formFields/ComboboxField';
import SwitchField from '@/formFields/SwitchField';
import { Button } from '@/components/ui/button';

type Props = {
    data?: DonationFormType;
    mode?: string;
};

const Donate = ({ data, mode = "add" }: Props) => {
    const donateForm = useForm<DonationFormType>({
        resolver: zodResolver(donationSchema),
        defaultValues: data ? data : {
            pickupRequired: true,
            isPerishable: false,
        },
    });

    const { handleSubmit, watch, reset } = donateForm;
    const pickupRequired = watch('pickupRequired');
    const isPerishable = watch('isPerishable');

    const onDonationSubmit = (data: DonationFormType) => {
        console.log('Donation submitted:', data);
        reset()
    };

    return (
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

                {!pickupRequired && isPerishable && (
                    <ComboboxField
                        name="dropLocation"
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
                    label="Pickup Time"
                    placeholder="Enter preferred pickup time"
                    name="pickupTime"
                    type="datetime-local"
                />

                <InputFormField
                    label="Notes"
                    placeholder="Additional notes..."
                    name="notes"
                    type="text"
                />

                {mode == "add" ? (
                    <Button type="submit" className="w-full">
                        Submit Donation
                    </Button>
                ) : mode == "edit" ? (
                    <Button type="submit" className="w-full">
                        Edit Donation
                    </Button>
                ) : null}
            </form>
        </FormProvider>
    );
};

export default Donate;
