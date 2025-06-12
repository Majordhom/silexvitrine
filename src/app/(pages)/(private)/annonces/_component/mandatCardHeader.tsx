import React from "react";
import {MANDAT_STATUS_ARCHIVE, MANDAT_STATUS_LOUE, MANDAT_STATUS_VENDU, MandatItem} from "@/app/_lib/db/MandatUtils";
import {SimpleImage} from "@/app/_lib/ui-kit/components/simpleImage";
import {MandatChips} from "@/app/(pages)/(private)/mandats/_component/header/mandatChips";
import {MandatTitle} from "./header/mandatTitle";
import {MandatStatutChips} from "@/app/(pages)/(private)/mandats/_component/header/mandatStatutChips";
import {MandatAddress} from "@/app/(pages)/(private)/mandats/_component/header/mandatAddress";
import {MandatMisc} from "@/app/(pages)/(private)/mandats/_component/header/mandatMisc";
import {MandatPrice} from "@/app/(pages)/(private)/mandats/_component/header/mandatPrice";

export function MandatCardHeader({mandat}: { mandat?: MandatItem }) {
  return <div className="flex flex-col sm:flex-row w-full justify-between select-none gap-4">
    {/* PHOTO */}
    <div className={'sm:w-56 h-36 rounded-lg overflow-hidden w-full '}>
      {(mandat?.photos && mandat.photos.length > 0) ?
        <SimpleImage className={`w-full h-full object-cover cursor-pointer ${[MANDAT_STATUS_ARCHIVE, MANDAT_STATUS_VENDU, MANDAT_STATUS_LOUE].includes(mandat.statut ?? '') ? 'grayscale' : ''}`} priority={true} fetchPriority={'auto'} width={166} height={166} alt={'photo'} src={mandat.photos[0].src}></SimpleImage>
        : <div className={`w-full h-full bg-gray-200 text-textLight flex items-center justify-center p-6 text-center ${!mandat && 'animate-pulse'}`}>{mandat ? 'Pas de photos' : ''}</div>
      }
    </div>

    {/* HEADER / DESCRIPTION*/}
    <div className={`w-full ${!mandat && 'flex flex-col gap-2'}`}>
      <div className={"font-medium text-lg flex flex-wrap gap-1 items-center"}>
        <span><MandatTitle mandat={mandat}/></span>
        <MandatStatutChips mandat={mandat}/>
      </div>
      <div className={"flex flex-wrap gap-1 items-center"}>
        <MandatAddress mandat={mandat}/>
      </div>
      <MandatMisc mandat={mandat}/>
      <div className={'flex flex-wrap gap-1 mt-4'}>
        <MandatChips mandat={mandat}/>
      </div>
    </div>

    {/* PRICE / RAPPROCHEMENTS */}
    <div className="flex-auto flex justify-end text-xl w-full sm:w-52">
      <MandatPrice mandat={mandat}/>
    </div>
  </div>
}