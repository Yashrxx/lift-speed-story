const Hero = () => {
  return (
    <section className="relative bg-gradient-hero text-primary-foreground py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto max-w-5xl relative z-10 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Speed Control of DC Motor – Application in Lift Operation
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl">
          Understand how DC motor control ensures smooth lift motion, accurate stopping, and safety.
        </p>
      </div>
      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
