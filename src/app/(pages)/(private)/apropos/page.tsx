import SectionCard from "@/app/_lib/components/SectionCard";
import ImageHistoire from "@/app/_lib/components/img_histoire";
import ImageValeurs from "@/app/_lib/components/img_valeurs";
import ImageEquipe from "@/app/_lib/components/img_equipe";
import ImageServices from "@/app/_lib/components/img_services";
import ImageEngagement from "@/app/_lib/components/img_engagement";

const sections = [
    {
        id: "histoire",
        title: "Notre histoire",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec cursus enim erat nec urna. Mauris euismod, sapien nec laoreet dictum, enim erat dictum urna, nec cursus enim erat nec urna.",
        imageComponent: <ImageHistoire />
    },
    {
        id: "valeurs",
        title: "Nos valeurs",
        text: "Praesent euismod, justo ac facilisis cursus, enim erat dictum urna, nec cursus enim erat nec urna. Etiam euismod, sapien nec laoreet dictum, enim erat dictum urna, nec cursus enim erat nec urna.",
        imageComponent: <ImageValeurs />
    },
    {
        id: "equipe",
        title: "L'équipe",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        imageComponent: <ImageEquipe />
    },
    {
        id: "services",
        title: "Nos services",
        text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        imageComponent: <ImageServices />
    },
    {
        id: "engagements",
        title: "Nos engagements",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        imageComponent: <ImageEngagement />
    },
];

export default function AproposAgencePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full text-center mb-8">
                <h1 className="text-4xl font-bold text-primary">À propos de notre agence…</h1>
            </div>
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section) => (
                    <SectionCard
                        key={section.id}
                        title={section.title}
                        text={section.text}
                        imageAlt={section.title}
                        imageComponent={section.imageComponent}
                    />
                ))}
            </div>
        </main>
    );
}