# Documentation de La branche


# Main Changes :
- Modification du Middleware pour handle le routing en fonction de variables d'environnements
- "Maquettes" dynamiques 
- Maquette Théo vibe coded (Experimentale, maquette de dev)
- Refactor du code, Enhancement SEO & Responsive

# Recent Updates :
- Migration vers Next.js 15 avec correction des types params/searchParams
- Correction des liens d'annonces et système de routing
- Amélioration de la pagination sur la page annonces
- Hero section avec slider fonctionnel et styling amélioré
- Page détail annonce restructurée avec données enrichies
- Formulaires de contact fonctionnels connectés à l'API
- Affichage structuré des caractéristiques de propriétés
- Suppression de dangerouslySetInnerHTML pour la sécurité

# To do
- [x] Refactor l'ancien code qui est très messy  
- [x] Faire attention au SEO, compléter les layouts et les metadata  
- [x] Corriger les bugs de routing et pagination
- [x] Rendre les formulaires de contact fonctionnels
- [x] Enrichir l'affichage des données d'annonces
- [ ] Faire les liens du footer
- [ ] réparer la pagination a chier
- [ ] opti le calcul backend
- [ ] historique coté client pour plus de simpli
- [ ] Refaire le Front de Arthur qui est buggé  
- [ ] Implémenter un script bash de Test  
- [ ] Penser à l'architecture d'implémentation des maquettes  
- [ ] Faire les autres maquettes


[Documentation Refactor](https://github.com/Majordhom/silexvitrine/edit/rework/dynamic-layouts-001/Refactor.md)



# Get Started

### Quickstart (Dev)

```bash
git clone https://github.com/Majordhom/silexvitrine.git
cd silexvitrine
git switch rework/dynamic-layouts-001 # git checkout rework/dynamic-layouts-001
pnpm i # npm i / yarn install

pnpx prisma generate
pnpx prisma format
pnpx prisma validate
pnpx prisma db push

# Setup .env.example and rename it to .env
pnpm dev # npm run dev / yarn dev

```

## CI/CD Commands

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma db pull   # Pull schema from database
npx prisma migrate deploy  # Deploy migrations (production)
npx prisma studio    # Open Prisma Studio

# Testing & Quality
npm run type-check   # TypeScript type checking (if available)
npm test            # Run tests (if configured)
```

### CI/CD Pipeline Commands

```bash
# Pre-build checks
npm ci              # Clean install dependencies
npm run lint        # Lint code
npx prisma generate # Generate Prisma client

# Build process
npm run build       # Build application
npm run start       # Start production server

# Database operations (production)
npx prisma migrate deploy  # Apply pending migrations
npx prisma generate        # Regenerate client after migrations
```

### Environment Setup

```bash
# Required environment variables for CI/CD
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
NEXT_PUBLIC_MAIN_ROUTE="theo"  # or "arthur"

# Optional for specific features
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Build Verification

```bash
# Verify build integrity
npm run build && npm run start
# Check if server starts without errors
curl http://localhost:3000/health  # Health check endpoint

# Database connectivity test
npm run build
node -e "const { prisma } = require('./dist/src/app/_lib/prisma'); prisma.mandat.count().then(console.log)"
```

### Deployment Steps

1. **Pre-deployment checks:**
```bash
npm ci
npm run lint
npm run build
npx prisma migrate deploy
```

2. **Production deployment:**
```bash
npm run start
# Or with PM2: pm2 start npm --name "silexvitrine" -- start
```



