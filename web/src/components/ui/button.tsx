import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text'
  text?: string
  icon?: ReactNode
  size?: 'lg' | 'md' | 'sm',
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = "primary", text, icon, size = "md", fullWidth = false, ...props }, ref) => {

  const variants = {
    'primary': 'text-zinc-200 bg-zinc-800 border-solid border border-zinc-200',
    'secondary': 'bg-zinc-200 text-zinc-700 border-solid border border-zinc-300',
    'text': 'bg-transparent text-zinc-600'
  } as const

  const sizes = {
    'lg': 'text-lg p-4',
    'md': 'text-sm p-2',
    'sm': 'text-xs p-1'
  } as const

  return (
    <button
      className={` rounded-lg min-w-7 text-center justify-center ${variants[variant]} ${sizes[size]} ${fullWidth && 'w-full'} flex items-center`}
      {...props}
      ref={ref}
    >
      {text}
      {icon && icon}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }