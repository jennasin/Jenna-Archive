export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight"
            data-testid="text-about-title"
          >
        More About This Archive
          </h1>

          <div className="space-y-8 text-base md:text-lg leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                The Question
              </h2>
              <p className="mb-4">
                <span className="text-foreground font-medium italic">
                  How do machines extend, transform, and replace the human body, and what does
                  that mean for our sense of being human?
                </span>
              </p>
              <p>
                This archive explores the increasingly blurred boundary between human biology and
                technology. From prosthetic limbs that restore lost function to neural interfaces
                that create direct pathways between brain and computer, we are witnessing an
                interesting integration of mechanical systems with organic life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Machine Flesh
              </h2>
              <p className="mb-4">
                The title "Machine Flesh" intentionally juxtaposes two seemingly incompatible
                concepts. Machines are typically understood as rigid, predictable, and
                manufactured—products of human design. Flesh is soft, vulnerable, and
                organic—evolved rather than designed. Yet contemporary medical and technological
                developments reveal these categories to be less distinct than we once thought.
              </p>
              <p>
                When a prosthetic limb responds to
                neural signals, when genetic engineering rewrites DNA—in these moments, the machine
                and the flesh are not separate entities. They form a hybrid system that challenges
                our traditional understanding of what it means to be human.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                The Archive
              </h2>
              <p className="mb-4">
                This collection brings together images, videos, and scholarly articles that
                document various forms of human-machine integration. Each piece represents a
                different dimension of this relationship:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <span className="text-foreground font-medium">Prosthetics and Enhancement:</span>{" "}
                  Devices that restore or amplify physical capabilities
                </li>
                <li>
                  <span className="text-foreground font-medium">Neural Interfaces:</span> Direct
                  connections between brain and computer
                </li>
                <li>
                  <span className="text-foreground font-medium">Medical Technology:</span>{" "}
                  Artificial organs and surgical robotics
                </li>
                <li>
                  <span className="text-foreground font-medium">Wearable Tech:</span> Devices that
                  monitor and quantify the body
                </li>
                <li>
                  <span className="text-foreground font-medium">Genetic Engineering:</span>{" "}
                  Technologies that edit biological code
                </li>
                <li>
                  <span className="text-foreground font-medium">Virtual Embodiment:</span>{" "}
                  Technologies that alter our sense of physical presence
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Philosophical Implications
              </h2>
              <p className="mb-4">
                These technologies raise profound questions about human identity and experience:
              </p>
              <p className="mb-4">
                <span className="text-foreground font-medium">What defines the human?</span> If we
                can enhance our bodies with technology, at what point does augmentation become
                transformation? Are we still "human" when vital functions depend on machines?
              </p>
              <p className="mb-4">
                <span className="text-foreground font-medium">Agency and autonomy:</span> When our
                thoughts can control machines, or when algorithms influence our decisions based on
                bodily data, where does human agency begin and technological mediation end?
              </p>
              <p>
                <span className="text-foreground font-medium">Evolution and design:</span> For
                millennia, human bodies evolved through natural selection. Now we possess tools to
                consciously design our biological future. What responsibility comes with this
                power?
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                We Are All Cyborgs
              </h2>
              <p className="mb-4">
                Donna Haraway famously argued in her "Cyborg Manifesto" that we are all already
                cyborgs—hybrid beings whose identities are shaped by our relationships with
                technology. While this may have seemed like a radical claim in 1985, it feels
                increasingly self-evident today.
              </p>
              <p>
                This archive invites you to examine these hybrid forms and consider their
                implications. As technology becomes ever more integrated with human biology, these
                questions will only become more urgent. Understanding the present state of
                human-machine integration may help us navigate the choices that lie ahead.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                This archive is a curated collection for educational and contemplative purposes,
                exploring the intersection of technology and humanity through visual and textual
                resources.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
