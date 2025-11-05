import { useState } from "react";
import Hero from "@/components/Hero";
import BlockDiagram from "@/components/BlockDiagram";
import SpeedSimulator from "@/components/SpeedSimulator";
import LiveLiftVisualizer from "@/components/LiveLiftVisualizer";
import MotorCalculations from "@/components/MotorCalculations";
import OperationStages from "@/components/OperationStages";

const Index = () => {
  const [speed, setSpeed] = useState(100);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <BlockDiagram />
      <SpeedSimulator speed={speed} onSpeedChange={setSpeed} />
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <LiveLiftVisualizer speed={speed} />
        </div>
      </section>
      <MotorCalculations speed={speed} />
      <OperationStages />
      
      <footer className="bg-primary text-primary-foreground py-8 text-center">
        <p className="text-sm">
          Educational Material: DC Motor Speed Control in Lift Systems
        </p>
      </footer>
    </div>
  );
};

export default Index;
