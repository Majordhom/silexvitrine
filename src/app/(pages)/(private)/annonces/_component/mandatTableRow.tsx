import React, {useState} from "react";
import {linkMandat, MandatItem} from "@/app/_lib/db/MandatUtils";
import Link from "next/link";
import {MandatCardHeader} from "@/app/(pages)/(private)/mandats/_component/mandatCardHeader";
import {useItemDrag} from "@/app/_lib/contexts/ItemDragProvider";
import {Buyer, Project} from "@prisma/client";
import {useAlert} from "@/app/_lib/ui-kit/hooks/useAlert";
import {RapprochementAddedPopup} from "@/app/(pages)/(private)/projects/_component/projectTableRow";

export const MandatTableRow = ({mandat}: { mandat?: MandatItem }) => {
  const {draggedItem, setDraggedItem} = useItemDrag()
  const [isDragOver, setIsDragOver] = useState(false)
  const setAlert = useAlert()

  if (!mandat) {
    return <MandatCardHeader/>
  }

  const onDrop = async () => {
    setDraggedItem(null)
    setIsDragOver(false)
    if (mandat && draggedItem && (draggedItem as Project).rank) {
      try {
        const res = await fetch('/api/projects/' + draggedItem.id + '/rapprochements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({mandat_id: mandat.id})
        });
        if (!res.ok) {
          new Error((await res.json())?.error)
        }
        if (res.status === 200) {
          setAlert(<RapprochementAddedPopup project={(draggedItem as Project)}/>)
        }
      } catch (e) {
        setAlert((e as Error).message)
      }
    }
  }

  const onDragEnter = () => {
    if ((draggedItem as (Project & { buyers: Buyer[] })).buyers) {
      setIsDragOver(true)
    }
  }

  const onDragLeave = () => {
    setIsDragOver(false)
  }

  return (
    <Link href={linkMandat(mandat)}>
      <div onDrop={onDrop} onDragOver={e => e.preventDefault()} onDragEnter={onDragEnter} onDragLeave={onDragLeave} className={'relative w-full'}>
        {isDragOver && <div className={'text-xl text-white absolute backdrop-blur-sm z-10 w-full h-full flex items-center justify-center pointer-events-none bg-purple-500/50'}>
          Ajouter en rapprochement
        </div>}
        <div className={'pointer-events-none w-full'}>
          <MandatCardHeader mandat={mandat}/>
        </div>
      </div>
    </Link>
  )
}