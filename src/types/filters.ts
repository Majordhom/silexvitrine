export interface FilterOption {
  key: string;
  label: string;
}

export interface SearchCriteria {
  query?: string;
  prixMin?: number;
  prixMax?: number;
  ville?: string;
  type_bien?: string[];
  secteurs?: string[];
  nb_pieces?: number;
  surface_min?: number;
  surface_max?: number;
}

export interface SearchResponse {
  mandats: Array<{
    id: number;
    mandat_numero: string;
    prix: number;
    ville: string;
    cp: number;
    type_bien: string;
    nb_pieces: number;
    surface_habitable: number;
    photos: Array<{
      id: number;
      src: string;
      filename: string;
    }>;
  }>;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}