import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface ConfirmLogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmLogoutModal({
  isOpen,
  onClose,
  onConfirm
}: ConfirmLogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? Any unsaved changes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
