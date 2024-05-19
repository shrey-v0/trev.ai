"use client";

import { Skeleton } from "@trev/ui";

import { Shell } from "../dashboard/shell";
import { ThemeToggle } from "../theme-toggle";
import { AppTabs } from "./app-tabs";
import { Breadcrumbs } from "./breadcrumbs";

export const AppHeader = () => {
  return (
    <header className="border-border sticky top-2 z-50 w-full">
      <Shell className="bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs />
          <div className="flex items-center gap-1">
            <div className="relative">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="absolute inset-0">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
        <AppTabs />
      </Shell>
    </header>
  );
};
