import { Button } from "./button";

interface PaginationPropsType {
  onPrev: () => void
  onNext: () => void
  showNext: boolean
  showPrev: boolean
}

export function Pagination({ onNext, onPrev, showNext, showPrev }: PaginationPropsType) {
  return (
    <div className="flex items-center gap-2 mt-2 justify-start">
      { showPrev && <Button text="prev" variant="secondary" onClick={onPrev}/>}
      { showNext && <Button text="next" variant="secondary" onClick={onNext}/>}
    </div>
  )
}