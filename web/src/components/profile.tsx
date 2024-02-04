interface ProfileProps {
  author: string
}

export function Profile({ author }: ProfileProps) {
  return (
    <div className="bg-zinc-100 rounded-lg text-center p flex items-center p-1 px-5 text-gray-600">
      <p data-testid="author" className="text-xs">{author}</p>
    </div>
  )
}