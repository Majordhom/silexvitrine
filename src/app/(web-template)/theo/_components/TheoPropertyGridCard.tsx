"use client";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { PropertyGridCardProps } from '../../dto';

export default function TheoPropertyGridCard({ 
    id, 
    type, 
    location, 
    price, 
    bedrooms, 
    bathrooms, 
    surface 
}: PropertyGridCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">Nouveau</span>
                </div>
                <div className="absolute top-4 right-4">
                    <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all">
                        <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{location}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {type}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span>{bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span>{bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span>{surface}</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                        {price}
                    </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Voir les détails
                </button>
            </div>
        </div>
    );
} 