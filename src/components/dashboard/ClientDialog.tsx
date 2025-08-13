import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ClientForm from './ClientForm';

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientCreated: (clientId: string) => void;
}

const ClientDialog = ({ open, onOpenChange, onClientCreated }: ClientDialogProps) => {
  const handleSave = (clientId: string) => {
    onClientCreated(clientId);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Create a new client to add to your quote or invoice.
          </DialogDescription>
        </DialogHeader>
        <ClientForm onSave={handleSave} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default ClientDialog;