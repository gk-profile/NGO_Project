import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

type props = {
    label: string,
    placeholder: string,
    name: string,
    type?: string,
    required?: boolean,
    value?: any,
    className?: string
}

const InputFormField = ({ label, placeholder, name, type = "text", required = true, value, className }: props) => {

    const { register, formState: { errors } } = useFormContext()

    const registerOptions = type === "number" ? { valueAsNumber: true } : {};

    return (
        <div className={cn('space-y-0.5', className)}>
            {label && <div className="flex flex-row">
                <Label htmlFor="combobox" className="text-sm font-semibold">{label}</Label>
                {required && <span className="pl-0.5 text-destructive ">*</span>}
            </div>
            }
            <Input type={type} id={name} placeholder={placeholder} {...register(name, registerOptions)} className='py-2' value={value} />
            {errors[name] && <p className="text-destructive text-[12px]">{errors[name].message as string}</p>}
        </div>
    )
}

export default InputFormField