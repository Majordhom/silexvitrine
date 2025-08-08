"use client";
import React, { useEffect, useMemo, useState } from "react";
import TheoPropertyCard from "../_components/TheoPropertyCard";
import TheoPropertyGridSkeleton from "../_components/TheoPropertyGridSkeleton";
import { Property } from "../../dto";

const FAVORITES_STORAGE_KEY = 'theo:favorites:v1';

function readFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .map((value) => (typeof value === 'number' ? value : Number(value)))
        .filter((value) => Number.isFinite(value));
    }
    return [];
  } catch {
    return [];
  }
}

export default function Liked() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  const favorites = useMemo(() => readFavorites(), []);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const ids = readFavorites();
        if (ids.length === 0) {
          setProperties([]);
          return;
        }

        const response = await fetch(`/api/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // We reuse search API and filter in client after since API doesn't accept ids list yet
          body: JSON.stringify({ criteria: {}, page: 1, pageSize: 200 }),
        });
        if (!response.ok) {
          setProperties([]);
          return;
        }
        const data = await response.json();
        const mandats = Array.isArray(data?.mandats) ? data.mandats : [];
        const mapped: Property[] = mandats
          .filter((m: any) => ids.includes(m.id))
          .map((mandat: any) => ({
            id: mandat.id,
            slug: mandat.mandat_numero,
            titre: `${mandat.type_bien} ${mandat.nb_pieces} pièces`,
            prix: mandat.prix,
            surface: mandat.surface_habitable || 0,
            nb_pieces: mandat.nb_pieces || 0,
            ville: mandat.ville,
            cp: mandat.cp?.toString() || '',
            photos: (mandat.photos || []).map((photo: any) => ({
              id: photo.id,
              url: photo.src || '/placeholder.jpg',
              alt: photo.filename || ''
            })),
            tags: [mandat.type_bien].filter(Boolean) as string[],
          }));
        setProperties(mapped);
      } catch (e) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();

    // Listen for favorites changes and refetch
    const handleStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY) {
        fetchFavorites();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes favoris</h1>
          <p className="text-gray-600">Retrouvez ici tous les biens que vous avez ajoutés en favoris.</p>
        </div>

        {loading ? (
          <TheoPropertyGridSkeleton count={6} />
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <TheoPropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun favori pour le moment</h3>
            <p className="text-gray-600 mb-6">Ajoutez des biens en favoris en cliquant sur le coeur sur les cartes d'annonces.</p>
            <a href="/theo/annonces" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Parcourir les annonces
            </a>
          </div>
        )}
      </div>
    </div>
  );
}