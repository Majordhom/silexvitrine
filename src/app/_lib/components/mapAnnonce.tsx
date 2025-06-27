"use client";

import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { ScrollBlocker } from "./scrollBlocker";
import "leaflet/dist/leaflet.css";

type Props = {
    latitude: number;
    longitude: number;
};

const defaultLat = 43.2965; //Marseille
const defaultLon = 5.3698;

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
