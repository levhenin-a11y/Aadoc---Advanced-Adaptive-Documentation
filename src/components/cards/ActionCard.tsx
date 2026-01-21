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
  permissionType: "reader" | "user" | "editor";
  onAction: () => void;
  className?: string;
}

const permissionColors = {
  reader: "text-warning",
  user: "text-warning",
  editor: "text-warning",
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
    <Card className={cn("bg-card shadow-lg hover:shadow-xl transition-shadow min-h-[360px] flex flex-col", className)}>
      <CardHeader className="text-center pb-4 pt-8">
        <h3 className="text-2xl font-bold tracking-wide text-ink-secondary">{title}</h3>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center gap-6 px-8 flex-1">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
          {icon}
        </div>
        
        <p className="text-center text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center gap-1 mt-auto">
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
      
      <CardFooter className="justify-center pb-8 pt-4">
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
