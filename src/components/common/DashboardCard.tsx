import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: {
    card?:string;
    header?:string;
    content?:string;
    footer?:string;
    cardAction?:string};
  children?: React.ReactNode;
  cardAction?: React.ReactNode;
}

const DashboardCard = ({
  header,
  content,
  footer,
  className,
  children,
  cardAction,
}: DashboardCardProps) => {
  return (
    <Card className={cn(`col-span-1 bg-surface border border-border p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 gap-0 relative`, className?.card)}>
      {children}

      {(header || cardAction) && (
        <CardHeader className={cn("relative z-10 flex-row justify-between items-center p-0 mb-8 space-y-0 border-none",className?.header)}>
         
              <CardTitle className="text-sm font-medium tracking-tight uppercase">
                {header}
              </CardTitle>
          
          {cardAction && <CardAction>{cardAction}</CardAction>}
        </CardHeader>
      )}

      {(content !== undefined || footer !== undefined) && (
        <div className="flex relative z-10 flex-col gap-0">
          {(content !== undefined) && (
            <CardContent className="p-0">
     
                {content}
            </CardContent>
          )}
          {(footer !== undefined) && (
            <CardFooter className="p-0 mt-2 border-none">
              <CardDescription className="text-sm text-text-muted">
                {footer}
              </CardDescription>
            </CardFooter>
          )}
        </div>
      )}
    </Card>
  );
};

export default DashboardCard;