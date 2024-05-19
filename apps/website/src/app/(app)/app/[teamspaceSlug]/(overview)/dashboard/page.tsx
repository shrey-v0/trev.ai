import { format } from "date-fns";

import { Separator } from "@trev/ui";

import SimpleChartWrapper from "@/components/charts/simple-chart-wrapper";
import { InfoBadge } from "@/components/dashboard/info-badges";
import { MetricsCard } from "@/components/dashboard/kpi-card";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

const page = async () => {
  //dora
  const deploymentFrequency = await api.dora.getDeploymentFrequency.query();
  const leadTime = await api.dora.getLeadTime.query();
  const changeFailureRate = await api.dora.getFailureRate.query();
  const meanTimeToRecover = await api.dora.getWaitTime.query();

  //cycle metrics
  const coding_time = await api.cycleMetrics.getCodingTime.query();
  const pr_pickup_time = await api.cycleMetrics.getPickupTime.query();
  const cycle_time = await api.cycleMetrics.getCycleTime.query();
  const merge_count = await api.cycleMetrics.getPRMergeCount.query();

  return (
    <div className="grid gap-4">
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
        <MetricsCard
          title="Deployment Frequency"
          metric={deploymentFrequency.deploymentFreq.toFixed(2)}
          suffix="Average Deployment Per Week"
          delta={-0.26}
          badge={<InfoBadge variant="postivie">Dora</InfoBadge>}
        >
          <SimpleChartWrapper
            data={deploymentFrequency.codingTimeWeekActivity
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((d) => ({
                ...d,
                timestamp: format(new Date(d.date), "LLL dd"),
              }))}
            category={"Deployments"}
            unit=""
          />
        </MetricsCard>
        <MetricsCard
          title="Lead Time"
          metric={Number(leadTime.leadTime.lead_time).toFixed(2) + " hr"}
          suffix="Average Deployment Lead Time"
          delta={-0.06}
          badge={<InfoBadge variant="postivie">Dora</InfoBadge>}
        >
          <SimpleChartWrapper
            data={leadTime.leadTimeWeeklyActivity
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((d) => ({
                ...d,
                timestamp: format(new Date(d.date), "LLL dd"),
              }))}
            category={"LeadTime"}
            unit="hr"
          />
        </MetricsCard>
        <MetricsCard
          title="Change Failure Rate"
          metric={
            (Number(changeFailureRate.failureRate.failure_rate) * 100).toFixed(
              2,
            ) + " % "
          }
          suffix="Percent of change failure"
          delta={0.015}
          badge={<InfoBadge variant="postivie">Dora</InfoBadge>}
        >
          <SimpleChartWrapper
            data={changeFailureRate.failureRateWeeklyActivity
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((d) => ({
                ...d,
                timestamp: format(new Date(d.date), "LLL dd"),
              }))}
            category={"incidents"}
            unit=""
          />
        </MetricsCard>
        <MetricsCard
          title="Mean Time To Recovery"
          metric={meanTimeToRecover.avgwaitTime + " hr"}
          suffix="Average time to recover"
          delta={-0.023}
          badge={<InfoBadge variant="postivie">Dora</InfoBadge>}
        >
          <SimpleChartWrapper
            data={meanTimeToRecover.meanTimeToRecoverActivity
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((d) => ({
                ...d,
                timestamp: format(new Date(d.date), "LLL dd"),
              }))}
            category={"waitTime"}
            unit="hr"
          />
        </MetricsCard>
      </div>
      <h2 className="text-2xl font-semibold">Cycle Time Breakdown</h2>
      <Separator />
      {/* Cycle Metrics */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <MetricsCard
          title="PR Coding time"
          metric={
            (Number(coding_time.codingTimeThisWeek.coding_time) * 100).toFixed(
              2,
            ) + " hr"
          }
          suffix="Average Cycle Time"
          delta={coding_time.delta}
          badge={<InfoBadge variant="postivie">Velocity</InfoBadge>}
        />
        <MetricsCard
          title="PR Pickup Time"
          metric={
            Number(pr_pickup_time.pickupTimeThisWeek.pickup_time).toFixed(2) +
            " hr"
          }
          suffix="Average Cycle Time"
          delta={pr_pickup_time.delta}
          badge={<InfoBadge variant="postivie">Velocity</InfoBadge>}
        />
        <MetricsCard
          title="Merge Cycle Time"
          metric={
            Number(cycle_time.cycleTimeThisWeek.cycle_time).toFixed(2) + " hr"
          }
          suffix="Average Cycle Time"
          delta={cycle_time.delta}
          badge={<InfoBadge variant="postivie">Velocity</InfoBadge>}
        />
      </div>
      <MetricsCard
        title="PR Merge Count"
        metric={merge_count.avgMergeCount.toFixed(0)}
        suffix="Average PR Merged per week"
        delta={-0.2}
        badge={<InfoBadge variant="postivie">Productivity</InfoBadge>}
      >
        {
          <SimpleChartWrapper
            data={merge_count.prMergeData
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((d) => ({
                ...d,
                timestamp: format(new Date(d.date), "LLL dd"),
              }))}
            category={"value"}
          />
        }
      </MetricsCard>
    </div>
  );
};

export default page;
