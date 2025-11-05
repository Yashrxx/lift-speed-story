import { useState } from "react";
import Hero from "@/components/Hero";
import BlockDiagram from "@/components/BlockDiagram";
import SpeedSimulator from "@/components/SpeedSimulator";
import MotorCalculations from "@/components/MotorCalculations";
import OperationStages from "@/components/OperationStages";

const Index = () => {
  const [speed] = useState(100);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <BlockDiagram />
      <SpeedSimulator />
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
