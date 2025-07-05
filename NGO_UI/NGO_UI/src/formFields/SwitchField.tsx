import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from 'react-hook-form';

const SwitchField = ({ name, label }: { name: string; label: string }) => {
  const { watch, setValue } = useFormContext();
  const checked = watch(name);

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={name}>{label}</Label>
      <Switch
        id={name}
        checked={checked}
        onCheckedChange={(value) => setValue(name, value)}
      />
    </div>
  );
};

export default SwitchField;
