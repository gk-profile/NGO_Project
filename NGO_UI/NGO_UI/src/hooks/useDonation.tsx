import { commonDelete, commonGET, commonPOST, commonPUT } from "@/api/donationApis";
import type { DonationFormType } from "@/form/donateForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type PaginatedDonationsResponse = {
    current_page: number;
    num_pages: number;
    results: DonationFormType[];
};

export const usePaginatedDonations = (userID: string, page: number) => {
    return useQuery<PaginatedDonationsResponse, Error>({
        queryKey: ['donations', userID, page],
        queryFn: () => commonGET('/donation/', { userID, page }),
        enabled: !!userID,
    });
};

export const useAddDonationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DonationFormType) => commonPOST("/donation/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};

export const useEditDonationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DonationFormType) => commonPUT("/donation/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};

export const useDeleteDonationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DonationFormType) => commonDelete("/donation/", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};
