import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface InactivityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function InactivityModal({ isOpen, onClose }: InactivityModalProps) {
  const router = useRouter()
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleContinue = () => {
    setOpen(false)
    onClose()
    router.push('/login')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Expired</DialogTitle>
          <DialogDescription>
            You have been logged out due to inactivity.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleContinue}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
