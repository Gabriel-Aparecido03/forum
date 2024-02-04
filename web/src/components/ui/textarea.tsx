import { forwardRef, TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ isInvalid = false,...props }, ref) => {
  return (
    <textarea 
      ref={ref} 
      className={`text-zinc-700 text-sm font-light resize-none border-solid border bg-zinc-100  rounded-lg p-2 w-full ${isInvalid ? 'border-red-400' : 'border-zinc-200'}`} 
      {...props} 
      
      />
  )
})

export { Textarea }