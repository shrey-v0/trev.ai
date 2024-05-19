import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ChevronDown, ChevronUp, InfoIcon } from "lucide-react";

import { Badge, HoverCard, HoverCardContent, HoverCardTrigger } from "@trev/ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva("", {
  variants: {
    variant: {
      default: "border-border",
      negative:
        "border-red-500/20 bg-red-500/10 hover:bg-red-500/10 text-red-500",
      postivie:
        "border-green-500/20 bg-green-500/10 hover:bg-green-500/10 text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface InfoBadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

export const InfoBadge = ({ children, variant }: InfoBadgeProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(badgeVariants({ variant }), "w-fit")}
    >
      {children}
    </Badge>
  );
};

export const InfoBadgeWithPopover = ({ children, variant }: InfoBadgeProps) => {
  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger asChild className="w-fit">
        <Badge
          variant="secondary"
          className={cn(badgeVariants({ variant }), "w-fit, cursor-pointer")}
        >
          {children}
          <InfoIcon className="ml-1 h-3 w-3" />
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent>
        <></>
      </HoverCardContent>
    </HoverCard>
  );
};

export const DeltaBadge = ({ value }: { value: number }) => {
  const percentage = value * 100;

  const variant: VariantProps<typeof badgeVariants>["variant"] =
    percentage > 0 ? "postivie" : percentage < 0 ? "negative" : "default";

  return (
    <Badge
      variant="outline"
      className={cn(badgeVariants({ variant }), "w-fit")}
    >
      <span>
        {percentage > 0 ? <ChevronUp className="mr-0.5 h-3 w-3" /> : null}
        {percentage < 0 ? <ChevronDown className="mr-0.5 h-3 w-3" /> : null}
      </span>
      {Math.abs(Number(percentage.toFixed(1)))}%
    </Badge>
  );
};
