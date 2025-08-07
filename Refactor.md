# Web Template - Architecture DTO

Cette documentation explique l'organisation des DTOs (Data Transfer Objects) et des données dans le template web.

## Structure des Dossiers

```
src/app/(web-template)/
├── dto/                    # Data Transfer Objects (Interfaces TypeScript)
│   ├── blog.dto.ts        # Interfaces liées au blog
│   ├── navigation.dto.ts  # Interfaces de navigation
│   ├── property.dto.ts    # Interfaces des propriétés immobilières
│   ├── search.dto.ts      # Interfaces de recherche et filtres
│   ├── ui.dto.ts         # Interfaces des composants UI
│   └── index.ts          # Export central de tous les DTOs
├── data/                  # Données statiques typées
│   ├── blog-posts.data.ts      # Articles de blog
│   ├── hero-slides.data.ts     # Slides du hero carousel
│   ├── mock-properties.data.ts # Propriétés de test
│   └── index.ts               # Export central de toutes les données
└── theo/                  # Template Theo
    ├── _components/       # Composants réutilisables
    ├── annonces/         # Pages des annonces
    ├── blog/             # Pages du blog
    └── ...
```

## DTOs Disponibles

### Blog (`blog.dto.ts`)
- `BlogPost` : Article de blog complet avec contenu structuré
- `BlogContentBlock` : Bloc de contenu (heading, paragraph, list)
- `SimpleBlogPost` : Version simplifiée pour les listes
- `BlogSectionProps` : Props de la section blog

### Navigation (`navigation.dto.ts`)
- `NavigationContextType` : Context de navigation global
- `TheoBurgerMenuProps` : Props du menu burger

### Propriétés (`property.dto.ts`)
- `Property` : Propriété immobilière de base
- `PropertyDetailAnnonce` : Propriété avec détails complets
- `PropertyCharacteristics` : Caractéristiques détaillées
- `AnnoncePhoto` : Photo d'annonce
- `SimilarProperty` : Propriété similaire
- `PropertyCardProps` : Props des cartes de propriété

### Recherche (`search.dto.ts`)
- `TheoAdvancedSearchProps` : Props de recherche avancée
- `TheoAnnoncesWithFiltersProps` : Props de la page d'annonces avec filtres

### UI (`ui.dto.ts`)
- `Feature` : Fonctionnalité avec icône
- `FeaturesSectionProps` : Props de la section fonctionnalités
- `HeroSlide` : Slide du carousel hero

## Données Statiques

### Blog (`blog-posts.data.ts`)
Articles de blog avec contenu complet et métadonnées.

### Hero (`hero-slides.data.ts`)
Slides du carousel hero avec titres, sous-titres et images.

### Propriétés (`mock-properties.data.ts`)
Données de test pour les propriétés immobilières.

## Usage

### Import des DTOs
```typescript
import { BlogPost, Property, SearchCriteria } from '@/(web-template)/dto';
```

### Import des données
```typescript
import { blogPosts, heroSlides, mockAnnonce } from '@/(web-template)/data';
```

### Example d'utilisation
```typescript
import { PropertyCardProps } from '@/(web-template)/dto';

function MyPropertyCard({ property, showTags }: PropertyCardProps) {
  // Component logic
}
```

## Avantages de cette Architecture

1. **Type Safety** : Tous les composants utilisent des interfaces TypeScript strictes
2. **Réutilisabilité** : DTOs partagés entre tous les templates
3. **Maintenabilité** : Structure centralisée et organisée
4. **Évolutivité** : Facile d'ajouter de nouveaux DTOs ou données
5. **Cohérence** : Types uniformes dans toute l'application

## Conventions

- Les fichiers DTOs se terminent par `.dto.ts`
- Les fichiers de données se terminent par `.data.ts`
- Utiliser des interfaces plutôt que des types quand possible
- Exporter tout via les fichiers `index.ts` centraux
- Documenter les interfaces complexes avec des commentaires