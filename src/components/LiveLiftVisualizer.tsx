import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Square } from "lucide-react";

interface LiveLiftVisualizerProps {
  speed: number;
}

type Direction = "up" | "down" | "stopped";
type OperationStage = "starting" | "running" | "braking" | "stopped";

const LiveLiftVisualizer = ({ speed }: LiveLiftVisualizerProps) => {
  const [position, setPosition] = useState(80); // Start at ground floor
  const [currentFloor, setCurrentFloor] = useState(1);
  const [direction, setDirection] = useState<Direction>("stopped");
  const [operationStage, setOperationStage] = useState<OperationStage>("stopped");
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const animationRef = useRef<number>();
  const stageTimeoutRef = useRef<NodeJS.Timeout>();

  const floors = [
    { number: 5, name: "5th Floor", height: 0 },
    { number: 4, name: "4th Floor", height: 20 },
    { number: 3, name: "3rd Floor", height: 40 },
    { number: 2, name: "2nd Floor", height: 60 },
    { number: 1, name: "Ground Floor", height: 80 },
  ];

  useEffect(() => {
    let lastTime = Date.now();
    let targetSpeed = 0;
    
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Calculate target speed based on direction
      if (direction === "up") {
        targetSpeed = speed;
      } else if (direction === "down") {
        targetSpeed = speed;
      } else {
        targetSpeed = 0;
      }

      // Smooth acceleration/deceleration
      setCurrentSpeed((prevSpeed) => {
        const acceleration = 50; // rpm per second
        const speedDiff = targetSpeed - prevSpeed;
        
        if (Math.abs(speedDiff) < acceleration * deltaTime) {
          return targetSpeed;
        }
        
        return prevSpeed + Math.sign(speedDiff) * acceleration * deltaTime;
      });

      setPosition((prevPosition) => {
        if (direction === "stopped" && currentSpeed < 5) return prevPosition;
        
        // Speed affects how fast the lift moves
        const movementSpeed = (currentSpeed / 100) * 20 * deltaTime;
        let newPosition = prevPosition;
        
        if (direction === "up") {
          newPosition = Math.max(0, prevPosition - movementSpeed);
        } else if (direction === "down") {
          newPosition = Math.min(80, prevPosition + movementSpeed);
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

    if (direction !== "stopped") {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, direction, currentSpeed]);

  // Determine operation stage based on current speed and target
  useEffect(() => {
    const targetSpeed = direction === "stopped" ? 0 : speed;
    const speedDiff = Math.abs(currentSpeed - targetSpeed);
    
    if (direction === "stopped" && currentSpeed < 5) {
      setOperationStage("stopped");
    } else if (speedDiff > 20) {
      setOperationStage(currentSpeed < targetSpeed ? "starting" : "braking");
    } else if (currentSpeed > 10) {
      setOperationStage("running");
    }
  }, [currentSpeed, direction, speed]);

  const handleMoveUp = () => {
    if (position > 0) {
      setDirection("up");
    }
  };

  const handleMoveDown = () => {
    if (position < 80) {
      setDirection("down");
    }
  };

  const handleStop = () => {
    setDirection("stopped");
  };

  const getStageColor = (stage: OperationStage) => {
    switch (stage) {
      case "starting": return "bg-yellow-500";
      case "running": return "bg-green-500";
      case "braking": return "bg-orange-500";
      case "stopped": return "bg-red-500";
    }
  };

  const getStageLabel = (stage: OperationStage) => {
    switch (stage) {
      case "starting": return "Starting - High Torque, Accelerating";
      case "running": return "Running - Stable Speed";
      case "braking": return "Braking - Controlled Deceleration";
      case "stopped": return "Stopped - Motor Idle";
    }
  };

  return (
    <Card className="p-8 shadow-card bg-gradient-card">
      <h3 className="text-2xl font-bold text-primary mb-6">Live Lift Visualization</h3>
      
      {/* Control Buttons */}
      <div className="mb-6 flex gap-4 items-center justify-center">
        <Button 
          onClick={handleMoveUp}
          disabled={position <= 0}
          className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
        >
          <ArrowUp className="mr-2" /> Move Up
        </Button>
        <Button 
          onClick={handleStop}
          variant="destructive"
          className="px-8 py-6 text-lg"
        >
          <Square className="mr-2" /> Stop
        </Button>
        <Button 
          onClick={handleMoveDown}
          disabled={position >= 80}
          className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
        >
          <ArrowDown className="mr-2" /> Move Down
        </Button>
      </div>

      {/* Operation Stage Indicator */}
      <div className="mb-6 p-4 bg-secondary/50 rounded-lg border-2 border-primary/20">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${getStageColor(operationStage)} animate-pulse`}></div>
          <div>
            <div className="text-sm text-muted-foreground">Operation Stage</div>
            <div className="text-lg font-bold text-foreground">{getStageLabel(operationStage)}</div>
          </div>
        </div>
      </div>
      
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
            <div className="text-sm text-muted-foreground mb-2">Current Speed</div>
            <div className="text-4xl font-bold text-accent">{currentSpeed.toFixed(1)} rpm</div>
            <div className="text-xs text-muted-foreground mt-1">Target: {direction === "stopped" ? 0 : speed} rpm</div>
          </div>

          <div className="p-6 bg-secondary rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">Lift Position</div>
            <div className="text-2xl font-bold text-foreground">
              {(100 - position).toFixed(1)}% of shaft height
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${direction !== 'stopped' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                Direction: {direction === "up" ? "↑ Moving Up" : direction === "down" ? "↓ Moving Down" : "⏹ Stopped"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use the control buttons above to move the lift up or down. Set target speed in the simulator section.
            </p>
          </div>

          {/* Stage Visual Indicators */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border">
            <div className="text-sm font-semibold text-foreground mb-3">Operation Stages Visual</div>
            <div className="space-y-2">
              <div className={`flex items-center gap-2 p-2 rounded transition-all ${operationStage === 'starting' ? 'bg-yellow-500/20 border border-yellow-500' : 'opacity-40'}`}>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Starting: High torque, accelerating</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded transition-all ${operationStage === 'running' ? 'bg-green-500/20 border border-green-500' : 'opacity-40'}`}>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs">Running: Constant speed</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded transition-all ${operationStage === 'braking' ? 'bg-orange-500/20 border border-orange-500' : 'opacity-40'}`}>
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-xs">Braking: Decelerating</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded transition-all ${operationStage === 'stopped' ? 'bg-red-500/20 border border-red-500' : 'opacity-40'}`}>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-xs">Stopped: Motor idle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveLiftVisualizer;
