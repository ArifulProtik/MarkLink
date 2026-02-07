import { Button } from '@ui/components/ui/button'

export function HomeComponent() {
  return (
    <div className="relative overflow-hidden w-full bg-primary/5">
      {/* Abstract Background Shapes using Theme Colors */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div
        className="container-fluid flex flex-col-reverse lg:flex-row
          items-center gap-12 py-20 lg:py-14 relative z-10"
      >
        {/* Left Column: Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1
            className="text-5xl lg:text-7xl font-bold tracking-tight
              text-foreground leading-[1.1]"
          >
            Share Your Story <br />
            <span className="text-primary">Connect the World</span>
          </h1>
          <p
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl
              mx-auto lg:mx-0"
          >
            MarkLink is the platform for writers, thinkers, and creators. Write
            beautiful stories, build your audience, and discover great content.
          </p>
          <div
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            <Button size="lg" className="text-lg h-12 px-8">
              Get Started
            </Button>
            <Button variant="ghost" size="lg" className="text-lg h-12 px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div
          className="flex-1 relative w-full max-w-[600px] lg:max-w-none flex
            justify-center"
        >
          <div className="relative aspect-square w-full max-w-[500px]">
            <img
              src="/hero-illustration.png"
              alt="MarkLink Digital Workspace Illustration"
              className="w-full h-full object-contain hover:scale-105
                transition-transform duration-500 dark:invert"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
