import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export default function DropTask({status} : DropTaskProps) {

    const { isOver , setNodeRef } = useDroppable({
        id: status
    })

    const sytle = {
        opacity: isOver ? 0.4 : undefined
    }

  return (
    <div
        style={sytle}
        ref={setNodeRef}
        className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
    >
      Soltar tarea aqui
    </div>
  )
}
