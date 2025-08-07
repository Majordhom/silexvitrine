/**
 * Search related DTOs
 */

import { SearchCriteria } from '@/types/filters';

export interface TheoAdvancedSearchProps {
    onSearch: (criteria: SearchCriteria) => void;
    initialCriteria?: Partial<SearchCriteria>;
    className?: string;
    showAdvanced?: boolean;
}

export interface TheoAnnoncesWithFiltersProps {
    initialMandats: Array<{
        id: number;
        mandat_numero: string;
        prix: number;
        ville: string;
        cp: number | null;
        type_bien: string;
        nb_pieces: number | null;
        surface_habitable: number | null;
        photos: Array<{
            id: number;
            mandatId: number;
            filename: string;
            src: string;
            position: number | null;
        }>;
    }>;
    initialTotal: number;
    initialPage: number;
}