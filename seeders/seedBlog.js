const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const blogPosts = [
  {
    slug: 'marche-immobilier-cabries-analyse-tendances',
    title: "Marché de l'immobilier à Cabriès : Analyse et Tendances 2024",
    excerpt: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement.",
    author: "Lino Reporter",
    publishedAt: new Date('2025-04-23'),
    category: "Analyse de marché",
    imageUrl: "/placeholder.jpg",
    readTime: "5 min",
    views: 1247,
    likes: 89,
    blocks: [
      { type: 'heading', text: 'Un marché immobilier dynamique' },
      { type: 'paragraph', text: "Le marché immobilier de Cabriès connaît une dynamique exceptionnelle depuis plusieurs années. Cette commune des Bouches-du-Rhône, située à seulement 15 kilomètres d'Aix-en-Provence, attire de plus en plus d'acheteurs en quête d'un cadre de vie privilégié." },
      { type: 'paragraph', text: "En 2024, les prix moyens s'établissent à :" },
      { type: 'list', items: [
        'Maisons : 4 500 €/m²',
        'Appartements : 3 800 €/m² à 4 200 €/m²',
      ] },
      { type: 'heading', text: "Les raisons de l'attractivité de Cabriès" },
      { type: 'paragraph', text: "Plusieurs facteurs expliquent le succès de Cabriès auprès des acheteurs :" },
      { type: 'list', items: [
        'Environnement de vie exceptionnel : Paysages verts et tranquillité à proximité de la métropole',
        'Localisation géographique idéale : Proximité des autoroutes, gare TGV et aéroport Marseille-Provence',
        'Offre variée : Maisons de caractère, villas contemporaines et appartements dans des résidences de standing',
        'Équipements nombreux : Installations sportives et culturelles, vie associative dynamique',
      ] },
      { type: 'heading', text: 'Perspectives pour 2025' },
      { type: 'paragraph', text: "Les experts prévoient une poursuite de la hausse des prix, portée par :" },
      { type: 'list', items: [
        'La demande croissante de familles et cadres',
        'La proximité des pôles économiques (Aix-en-Provence, Marseille)',
        'La qualité de vie offerte par la commune',
      ] },
      { type: 'heading', text: 'Conseils pour investir à Cabriès' },
      { type: 'paragraph', text: "Pour réussir votre investissement immobilier à Cabriès :" },
      { type: 'list', items: [
        'Privilégiez les biens proches des commodités',
        "Étudiez les projets d'aménagement futurs",
        'Considérez la rentabilité locative',
        "Négociez avec l'aide d'un expert local",
      ] },
    ],
  },
  {
    slug: 'guide-investir-immobilier-2024',
    title: "Guide complet pour investir dans l'immobilier en 2024",
    excerpt: "Tout ce que vous devez savoir pour faire un investissement immobilier réussi en 2024. Conseils d'experts et stratégies éprouvées.",
    author: "Marie Dubois",
    publishedAt: new Date('2025-04-20'),
    category: "Conseils",
    imageUrl: "/placeholder.jpg",
    readTime: "8 min",
    views: 2156,
    likes: 156,
    blocks: [
      { type: 'heading', text: "Pourquoi investir dans l'immobilier en 2024 ?" },
      { type: 'paragraph', text: "L'investissement immobilier reste l'un des placements les plus sûrs et rentables, même en période d'incertitude économique. Voici pourquoi 2024 est une année propice à l'investissement :" },
      { type: 'heading', text: "Les stratégies d'investissement gagnantes" },
      { type: 'list', items: [
        'Location classique : Revenus réguliers et plus-value à long terme',
        'Location saisonnière : Rentabilité optimisée dans les zones touristiques',
        'Rénovation et revente : Plus-value rapide sur des biens à potentiel',
      ] },
      { type: 'heading', text: "Conseils pour réussir son investissement" },
      { type: 'paragraph', text: "Pour maximiser vos chances de succès :" },
      { type: 'list', items: [
        'Étudiez attentivement la localisation',
        'Analysez la rentabilité brute et nette',
        'Prévoyez les frais annexes (taxes, charges, travaux)',
        'Diversifiez votre portefeuille immobilier',
      ] },
      { type: 'heading', text: 'Les erreurs à éviter' },
      { type: 'paragraph', text: "Les pièges classiques de l'investissement immobilier :" },
      { type: 'list', items: [
        'Négliger les diagnostics obligatoires',
        'Sous-estimer les coûts de rénovation',
        'Oublier la fiscalité immobilière',
        'Investir sans étude de marché',
      ] },
    ],
  },
  {
    slug: 'quartiers-marseille-investissement',
    title: "Les meilleurs quartiers de Marseille pour investir en 2024",
    excerpt: "Notre sélection des quartiers les plus prometteurs de Marseille pour votre investissement immobilier. Analyse détaillée et conseils pratiques.",
    author: "Pierre Martin",
    publishedAt: new Date('2025-04-18'),
    category: "Investissement",
    imageUrl: "/placeholder.jpg",
    readTime: "6 min",
    views: 1893,
    likes: 134,
    blocks: [
      { type: 'heading', text: 'Marseille : Une ville aux multiples visages' },
      { type: 'paragraph', text: "Marseille offre une diversité de quartiers aux profils très différents, chacun présentant des opportunités d'investissement spécifiques." },
      { type: 'heading', text: 'Les quartiers les plus prometteurs' },
      { type: 'subheading', text: 'Le Vieux-Port et ses environs' },
      { type: 'paragraph', text: "Le cœur historique de Marseille attire les touristes et les investisseurs :" },
      { type: 'list', items: [
        'Prix moyen : 4 200 €/m²',
        'Rentabilité locative : 4,5%',
        'Demande touristique forte',
      ] },
      { type: 'subheading', text: 'Le Panier' },
      { type: 'paragraph', text: "Le plus ancien quartier de Marseille connaît une renaissance :" },
      { type: 'list', items: [
        'Prix moyen : 3 800 €/m²',
        'Rénovation en cours',
        'Potentiel de plus-value important',
      ] },
      { type: 'subheading', text: 'La Joliette' },
      { type: 'paragraph', text: "Quartier en pleine transformation :" },
      { type: 'list', items: [
        'Prix moyen : 3 500 €/m²',
        "Projets d'aménagement nombreux",
        'Accessibilité excellente',
      ] },
    ],
  },
];

async function main() {
  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('Seeded blog posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });