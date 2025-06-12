"use client"
import React, {useEffect, useRef, useState} from "react";
import {SearchForm} from "@/app/_lib/components/searchForm";
import {MandatItem, MandatSearch, MandatStatus} from "@/app/_lib/db/MandatUtils";
import {MandatTableRow} from "@/app/(pages)/(private)/mandats/_component/mandatTableRow";
import ModalNewMandat from "@/app/(pages)/(private)/mandats/_component/modalNewMandat";
import {MandatSearchQuerySchema} from "@/app/api/(private)/mandats/_schema";
import {UserSelect} from "@/app/_lib/components/userSelect";
import {BackspaceIcon, DocumentPlusIcon} from "@heroicons/react/24/outline";
import useInfiniteList from "@/app/_lib/ui-kit/hooks/useInfiniteList";
import {DateInput} from "@/app/_lib/ui-kit/components/dateInput";
import {useSession} from "next-auth/react";
import {USER_PERM_EDIT_OTHER_MANDAT} from "@/app/_lib/db/UserUtils";
import {usePermission} from "@/app/_lib/contexts/PermissionProvider";
import {Chip} from "@/app/_lib/ui-kit/components/chip";
import {Button} from "@/app/_lib/ui-kit/components/button";
import {Spinner} from "@/app/_lib/ui-kit/components/spinner";
import {SimpleSideBar, useSidebar} from "@/app/_lib/ui-kit/components/simpleSideBar";
import {HorizontalScroller} from "@/app/_lib/ui-kit/components/horizontalScroller";
import {useHistoryParams} from "@/app/_lib/ui-kit/hooks/useHistoryParams";
import {Modal} from "@/app/_lib/ui-kit/components/modal";
import {SimpleImage} from "@/app/_lib/ui-kit/components/simpleImage";
import {DiffusionSearch} from "./_component/diffusionSearch";
import {ScrollTopButton} from "@/app/_lib/ui-kit/components/scrollTopButton";
import {MandatKeysButton} from "@/app/(pages)/(private)/mandats/_component/mandatKeysButton";
import MandatWarning from "@/app/(pages)/(private)/mandats/[id]/_component/MandatWarning";

export default function MandatsPage() {
    // ---- FUNCTIONS
    const fetchMandats = async (cursor?: string) => {
        if (!session.data?.user?.id || !canLoad.current) {
            return {
                items: [],
                cursor: null,
            };
        }
        updateCounts()
        let data;
        try {
            data = MandatSearchQuerySchema.parse({
                search: search,
                status: liste,
                cursor: cursor,
                date_creation: dateCreation ? dateCreation.toISOString() : null,
                diffusion: diffusion,
            });
            let json = await (await fetch(`/api/mandats`, {
                method: 'POST',
                body: JSON.stringify(data)
            })).json();
            setHasMore(json.cursor !== null && json.items.length === 10);
            setIsLoading(false)
            return {
                items: (json.items as MandatItem[]) ?? [],
                cursor: json.cursor,
            };
        } catch (e) {
            console.error(e);
            return {
                items: [],
                cursor: null,
            };
        }
    }

    const updateCounts = async () => {
        try {
            const response = await fetch(`/api/mandats/counts`, {
                method: 'POST',
                body: JSON.stringify({search: search, date_creation: dateCreation, diffusion: diffusion}),
            });
            if (response.ok) {
                const counts = await response.json();
                setListeCount(counts);
            }

        } catch (error) {
            console.error('Failed to fetch counts:', error);
        }
    };

    // ---- HOOKS
    const session = useSession();
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isNewMandatOpen, setIsNewMandatOpen] = useState(false);
    const [liste, setListe] = useState<string>('tous');
    const [search, setSearch] = useState<MandatSearch>({});
    const [diffusion, setDiffusion] = useState<string[] | null>(null);
    const [dateCreation, setDateCreation] = useState<Date | null>(null);
    const [listeCount, setListeCount] = useState()
    const mandats = useInfiniteList(fetchMandats);
    const userHasPermission = usePermission()
    const canLoad = useRef(false);

    const countFilters = () => {
        let count = 0;
        Object.entries(search).forEach(([_, value]) => {
            if (Array.isArray(value)) {
                if ((value as Array<any>).length > 0) ++count
            } else {
                if (value) ++count;
            }
        })
        if (dateCreation) ++count;
        if (diffusion && diffusion.length > 0) ++count;
        return count;
    }

    // ---- USE EFFECT
    useEffect(() => {
        if (session.data?.user?.id) {
            canLoad.current = true
            if (!userHasPermission(USER_PERM_EDIT_OTHER_MANDAT)) {
                setSearch({...search, users: [session.data.user.id]});
            } else {
                setSearch({...search});
            }
        }
    }, [session.data?.user?.id]);

    useHistoryParams(() => {
            setHasMore(false);
            setIsLoading(true);
            mandats.reload();
        }, [liste, search, dateCreation, diffusion],
        ['liste', 'search', 'date_creation', 'diffusion'],
        [
            str => setListe(str ?? 'tous'),
            str => str ? setSearch(JSON.parse(str)) : setSearch({}),
            str => setDateCreation(str ? new Date(Number(str)) : null),
            str => setDiffusion(str ? JSON.parse(str) : null),
        ],
        'mandatsSearch',);

    const searchBloc = (
        <div className={'flex w-full flex-col gap-2'}>
            <span className={'text-2xl font-medium'}>Filtres  ({countFilters()})</span>
            <div className="flex w-full flex-col gap-2">
                <Button color={'secondary'} onClick={() => {
                    setSearch({});
                    setDateCreation(null)
                    setDiffusion([]);
                }}>
                    Réinitialiser la recherche<BackspaceIcon className={'size-5'}/>
                </Button>
            </div>
            <UserSelect value={search.users ?? []} onSelectionChange={(values) => setSearch({...search, ...{users: values}})} hasClearButton={true}/>
            <DateInput  value={dateCreation} label={'Créé à partir du'} onChange={setDateCreation}/>
            <DiffusionSearch setDiffusion={setDiffusion} diffusion={diffusion}/>
            <SearchForm setSearch={setSearch} search={search}/>
        </div>
    )

    const rowClasses = `w-full bg-white hover:border-gray-300 flex flex-col gap-2 p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-100`

    const BottomRightButton = () => {
        const {isSidebarOpen} = useSidebar();
        return (
            <div className={`flex flex-row gap-2 fixed bottom-4 z-50 transition-all mr-2 ${isSidebarOpen ? "right-96 sm:fixed max-sm:hidden" : "right-11"}`}>
                <ScrollTopButton alwayVisible={true}/>
            </div>
        );
    };

    return (
        <SimpleSideBar content={searchBloc}>
            <BottomRightButton/>
            <div className="min-h-dvh bg-background rounded-3xl w-full p-3 2xl:p-6 flex flex-col gap-3 ">
                <span className={'text-2xl font-medium'}>Mandats</span>

                <div className={'pb-2'}>
                    <Button className={"min-w-fit mb-2 inline-flex text-sm h-9"} color={'mandatEnCreation'} onClick={() => setIsNewMandatOpen(true)}><DocumentPlusIcon className={'size-5'}/>Créer un mandat</Button>
                    <HorizontalScroller gradientColor={'background'} className={"flex flex-row gap-2"}>
                        {[{key: 'tous', label: 'Tous', color: 'default'}, ...MandatStatus].map((val) => (
                            <Button className={"min-w-fit text-sm h-9"} color={liste === val.key ? 'secondary' : undefined} key={val.key} onClick={() => {
                                setListe(val.key);
                                setIsLoading(true)
                            }}>
                                {val.label}&nbsp;
                                <Chip>{(listeCount && listeCount[val.key]) ? listeCount[val.key] : 0}</Chip>
                            </Button>
                        ))}
                    </HorizontalScroller>
                </div>

                <div aria-label="projects">
                    {isLoading ?
                        <div className={'flex flex-col gap-3'}>
                            {[...Array(10)].map((_, index) => <div key={index} className={rowClasses}><MandatTableRow/></div>)}
                        </div>
                        :
                        <div className={'flex flex-col gap-3'}>
                            {mandats.items.map((item: MandatItem) =>
                                <div key={item.id} className={rowClasses}>
                                    <MandatTableRow mandat={item}/>
                                </div>
                            )}
                            {mandats.items.length === 0 &&
                                <div className={'text-primary mt-24 flex flex-col w-full h-full justify-center items-center'}>
                                    <SimpleImage alt={'Silex logo'} src={'/img/silex.logo.svg'} width={120} height={87}/>
                                    <span className={'font-medium text-black'}>Aucun mandat trouvé.</span>
                                </div>}
                            {hasMore ? (
                                <div className="flex w-full mt-14 justify-center">
                                    <Spinner color="primary"/>
                                </div>
                            ) : null}
                        </div>
                    }
                </div>
            </div>

            <Modal
                isOpen={isNewMandatOpen}
                setIsOpen={setIsNewMandatOpen}
                size={"2xl"}
            >
                <ModalNewMandat/>
            </Modal>
        </SimpleSideBar>
    )
}
