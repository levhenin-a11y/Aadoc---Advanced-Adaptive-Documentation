import { ReactNode } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  permissionLabel: string;
  permissionType: "reader" | "user" | "admin";
  onAction: () => void;
  className?: string;
}

const permissionColors = {
  reader: "text-warning",
  user: "text-warning",
  admin: "text-warning",
};

const ActionCard = ({
  title,
  description,
  icon,
  permissionLabel,
  permissionType,
  onAction,
  className,
}: ActionCardProps) => {
  return (
    <Card className={cn("bg-card shadow-lg hover:shadow-xl transition-shadow", className)}>
      <CardHeader className="text-center pb-2">
        <h3 className="text-2xl font-bold tracking-wide text-foreground">{title}</h3>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center gap-4 px-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          {icon}
        </div>
        
        <p className="text-center text-muted-foreground text-sm">
          {description}
        </p>
        
        <div className="flex items-center gap-1">
          <span className={cn("text-sm font-medium", permissionColors[permissionType])}>
            {permissionLabel}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-0.5">
                <Info className="h-4 w-4 text-primary" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Required permission level to access this feature</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center pb-6 pt-2">
        <Button 
          onClick={onAction}
          className="w-40 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Go!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
