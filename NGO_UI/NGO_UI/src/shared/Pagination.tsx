import { Button } from "@/components/ui/button";

type Props = {
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const PaginationControls = ({ currentPage, numPages, onPageChange }: Props) => {
    return (
        <div className="flex justify-center gap-2 mt-4">
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </Button>

            <span className="px-4 py-2 text-sm text-muted-foreground">
                Page {currentPage} of {numPages}
            </span>

            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === numPages}
            >
                Next
            </Button>
        </div>
    );
};

export default PaginationControls;
