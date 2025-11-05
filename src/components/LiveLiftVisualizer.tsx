import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface LiveLiftVisualizerProps {
  speed: number;
}

const LiveLiftVisualizer = ({ speed }: LiveLiftVisualizerProps) => {
  const [position, setPosition] = useState(0);
  const [currentFloor, setCurrentFloor] = useState(1);
  const animationRef = useRef<number>();

  const floors = [
    { number: 5, name: "5th Floor", height: 0 },
    { number: 4, name: "4th Floor", height: 20 },
    { number: 3, name: "3rd Floor", height: 40 },
    { number: 2, name: "2nd Floor", height: 60 },
    { number: 1, name: "Ground Floor", height: 80 },
  ];

  useEffect(() => {
    let lastTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setPosition((prevPosition) => {
        // Speed affects how fast the lift moves (speed in rpm -> percentage movement)
        const movementSpeed = (speed / 100) * 15 * deltaTime;
        let newPosition = prevPosition + movementSpeed;

        // Bounce at boundaries
        if (newPosition > 80) {
          newPosition = 80;
        } else if (newPosition < 0) {
          newPosition = 0;
        }

        // Auto-reverse at top or bottom
        if (newPosition >= 80 || newPosition <= 0) {
          // Flip direction by negating in next cycle
          setTimeout(() => {
            setPosition(newPosition >= 80 ? 79.9 : 0.1);
          }, 500);
        }

        // Determine current floor based on position
        const floor = floors.find((f, idx) => {
          const nextFloor = floors[idx + 1];
          if (!nextFloor) return newPosition >= f.height - 5;
          return newPosition >= f.height - 5 && newPosition < nextFloor.height - 5;
        });
        
        if (floor) {
          setCurrentFloor(floor.number);
        }

        return newPosition;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (speed > 0) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setPosition(80); // Ground floor when stopped
      setCurrentFloor(1);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  return (
    <Card className="p-8 shadow-card bg-gradient-card">
      <h3 className="text-2xl font-bold text-primary mb-6">Live Lift Visualization</h3>
      
      <div className="flex gap-8 items-start">
        {/* Lift Shaft Visualization */}
        <div className="relative w-40 h-[500px] bg-muted border-4 border-border rounded-lg overflow-hidden">
          {/* Floor markers */}
          {floors.map((floor) => (
            <div
              key={floor.number}
              className="absolute w-full border-t-2 border-border flex items-center justify-between px-2"
              style={{ top: `${floor.height}%` }}
            >
              <span className="text-xs font-medium text-muted-foreground bg-background px-1 rounded">
                {floor.name}
              </span>
            </div>
          ))}

          {/* Lift Cabin */}
          <div
            className="absolute w-32 h-20 bg-gradient-to-b from-primary to-accent rounded-md shadow-lg transition-all duration-100 ease-linear left-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{ 
              top: `${position}%`,
            }}
          >
            <div className="text-primary-foreground font-bold text-lg">
              LIFT
            </div>
            {/* Cables */}
            <div className="absolute -top-2 left-4 w-1 h-2 bg-muted-foreground"></div>
            <div className="absolute -top-2 right-4 w-1 h-2 bg-muted-foreground"></div>
          </div>
        </div>

        {/* Status Panel */}
        <div className="flex-1 space-y-4">
          <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary">
            <div className="text-sm text-muted-foreground mb-2">Current Floor</div>
            <div className="text-5xl font-bold text-primary">{currentFloor}</div>
          </div>

          <div className="p-6 bg-accent/10 rounded-lg border-2 border-accent">
            <div className="text-sm text-muted-foreground mb-2">Motor Speed</div>
            <div className="text-4xl font-bold text-accent">{speed} rpm</div>
          </div>

          <div className="p-6 bg-secondary rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">Lift Position</div>
            <div className="text-2xl font-bold text-foreground">
              {(100 - position).toFixed(1)}% of shaft height
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${speed > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {speed > 0 ? 'Motor Active' : 'Motor Stopped'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {speed > 0 
                ? 'The lift is moving. Adjust speed to see real-time changes.' 
                : 'Enter a speed value above to start the lift.'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveLiftVisualizer;
