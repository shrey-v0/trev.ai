import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: Props) => {
  return (
    <div className="border-border bg-background col-span-full w-full rounded-lg border border-dashed p-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-1">
          {icon}
          <p className="text-foreground text-base">{title}</p>
          <p className="text-muted-foreground text-center">{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
};
