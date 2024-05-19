import { Skeleton } from "@trev/ui";

import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  description?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode | React.ReactNode[];
}

const Header = ({ title, description, className, actions }: HeaderProps) => {
  return (
    <div
      className={cn(
        "col-span-full flex items-start justify-start gap-1",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="font-semibold text-3xl">{title}</h1>
        {typeof description === "string" ? (
          <p className="text-muted-foreground">{description}</p>
        ) : (
          description
        )}
      </div>
      {/* actions on top right */}
      {actions ? (
        <div className="flex flex-1 items-center justify-end gap-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
};

const HeaderSkeleton = ({
  children,
  withDescription = true,
}: {
  children?: React.ReactNode;
  withDescription?: boolean;
}) => {
  return (
    <div className="col-span-full flex w-full justify-between">
      <div className="grid w-full gap-3">
        <Skeleton className="h-8 w-full max-w-[200px]" />
        {withDescription && <Skeleton className="h-4 w-full max-w-[300px]" />}
      </div>
      {children}
    </div>
  );
};

Header.Skeleton = HeaderSkeleton;

export { Header };
