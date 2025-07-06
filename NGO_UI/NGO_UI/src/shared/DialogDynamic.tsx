import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import React from 'react'

type dialogType = {
    title: React.ReactNode,
    description?: string,
    content?: React.ReactNode,
    isInfo?: boolean,
    infoDescription?: string,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    className?: string,
    model?: boolean,
    contentClassName?: string,
    badgeClassName?: string
}


const DialogDynamic = ({ title, description, content, isInfo = false, infoDescription, open, onOpenChange, model = true, className, contentClassName, badgeClassName }: dialogType) => {
    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange} modal={model}>
                <DialogContent
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    onInteractOutside={(e) => e.preventDefault()}
                    className={cn("sm:max-w-[425px] lg:max-w-md", contentClassName)}>
                    <DialogHeader>
                        <DialogTitle>{title} </DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center justify-center">
                        <div className={cn("", className)}>
                            {content}
                            {isInfo && <Badge className={cn("break-words whitespace-normal max-w-auto", badgeClassName)}>
                                <div className="flex flex-row gap-2">
                                    <Info /> {infoDescription}
                                </div>
                            </Badge>
                            }

                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogDynamic