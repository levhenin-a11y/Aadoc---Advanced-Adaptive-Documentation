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
    <Card className={cn("action-card", className)}>
      <CardHeader className="action-card-header">
        <h3 className="action-card-title">{title}</h3>
      </CardHeader>
      
      <CardContent className="action-card-content">
        <div className="action-card-icon-wrap">
          {icon}
        </div>
        
        <p className="action-card-description">
          {description}
        </p>
        
        <div className="action-card-permission">
          <span className={cn("action-card-permission-label", permissionColors[permissionType])}>
            {permissionLabel}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="action-card-info-btn">
                <Info className="h-4 w-4 text-primary" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Required permission level to access this feature</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
      
      <CardFooter className="action-card-footer">
        <Button 
          onClick={onAction}
          className="action-card-cta"
        >
          Go!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
