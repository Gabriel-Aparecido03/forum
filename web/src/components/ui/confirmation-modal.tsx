import { Button } from "./button"

interface ConfirmationModalProps {
  onConfirm : () => void
  onClose : () => void
  open : boolean
  onCancel : () => void
}


export function ConfirmationModal({onCancel ,onClose ,onConfirm ,open }:ConfirmationModalProps) {
  if(!open) return null

  return (
    <div className="w-screen h-screen bg-black/80 fixed flex items-center justify-center" onClick={onClose}>
      <div className="rounded-lg p-6 bg-white z-10 h-64 w-64">
        <p>This action will be permanently ! Do you have sure ?</p>
        <div className="flex item-center justify-center">
          <Button text="yes" variant="primary"/>
          <Button text="no" variant="text"/>
        </div>
      </div>
    </div>
  )
}