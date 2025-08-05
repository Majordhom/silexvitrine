# Documentation de La branche


# Main Changes :
- Modification du Middleware pour handle le routing en fonction de variables d'environnements
- "Maquettes" dynamiques 
- Maquette Théo vibe coded (Experimentale, maquette de dev)


# To do
[x] Refactor l'ancien code qui est très messy
[x]  Faire attention au SEO, completer les layouts et les metadata.
[] Refaire le Front de Arthur qui est buggé 
[] Implémenter un script bash de Test
[] Penser à l'architecture d'implémentation des maquettes
[] Faire les autres maquettes

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


