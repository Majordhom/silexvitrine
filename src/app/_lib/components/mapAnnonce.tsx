"use client";

import dynamic from "next/dynamic"; // cet import permet le chargement asynchrone des composants React
import { ScrollBlocker } from "./scrollBlocker";
import "leaflet/dist/leaflet.css";

type Props = {
    latitude: number;
    longitude: number;
};

const defaultLat = 43.2965; //Marseille
const defaultLon = 5.3698;

// Chargement dynamique pour éviter les erreurs de rendu côté serveur
// Chargement dynamique avec désactivation du SSR
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false } // désactive le rendu côté serveur pour ce composant
);

const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);

const Circle = dynamic(
    () => import("react-leaflet").then((mod) => mod.Circle),
    { ssr: false }
);

export default function MapAnnonce({ latitude, longitude }: Props) {
    const center: [number, number] = [
        isNaN(latitude) ? defaultLat : latitude,
        isNaN(longitude) ? defaultLon : longitude,
    ];

    return (
        <ScrollBlocker className="overflow-hidden rounded-2xl">
            <MapContainer
                center={center}
                zoom={14}
                className="h-[25rem] w-full"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Circle
                    center={center}
                    radius={300}
                    pathOptions={{ color: "transparent", fillColor: "#664099", fillOpacity: 0.5 }}
                />
            </MapContainer>
        </ScrollBlocker>
    );
}
