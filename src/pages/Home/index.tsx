import Page from "@/components/Page";
import analysisModel from "@/models/analysis.model";
import { RingProgress } from "@ant-design/charts";
import { ProCard, Statistic, StatisticCard } from "@ant-design/pro-components";
import { useReactive, useRequest } from "ahooks";
import { Segmented, Spin } from "antd";
import dayjs from "dayjs";
import RcResizeObserver from "rc-resize-observer";
import { useEffect, useMemo } from "react";
import styles from "./index.module.less";
import { DualAxes } from "@ant-design/plots";
import numeral from "numeral";

export default () => {
  const state = useReactive({
    responsive: false,
    dateTimeRange: "recent30Days",
    beginDate: dayjs()
      .subtract(30, "days")
      .startOf("days")
      .format("YYYY-MM-DD HH:mm:ss"),
    endDate: dayjs().endOf("days").format("YYYY-MM-DD HH:mm:ss"),
  });

  useEffect(() => {
    if (state.dateTimeRange === "recent30Days") {
      state.beginDate = dayjs()
        .subtract(30, "days")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
    }
    if (state.dateTimeRange === "recent3Month") {
      state.beginDate = dayjs()
        .subtract(3, "months")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
    }
    if (state.dateTimeRange === "recent6Month") {
      state.beginDate = dayjs()
        .subtract(6, "months")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
    }
  }, [state.dateTimeRange]);

  // const { data: marketTrend, loading: marketTrendLoading } = useRequest(
  //   () =>
  //     analysisModel.trendList({
  //       type: 1,
  //       beginDate: state.beginDate,
  //       endDate: state.endDate,
  //     }),
  //   {
  //     refreshDeps: [state.beginDate, state.endDate],
  //   }
  // );
  const { data: amountTrend, loading: amountTrendLoading } = useRequest(
    () =>
      analysisModel.trendList({
        type: 2,
        beginDate: state.beginDate,
        endDate: state.endDate,
      }),
    {
      refreshDeps: [state.beginDate, state.endDate],
    }
  );
  const { data: volumeTrend, loading: volumeTrendLoading } = useRequest(
    () =>
      analysisModel.trendList({
        type: 3,
        beginDate: state.beginDate,
        endDate: state.endDate,
      }),
    {
      refreshDeps: [state.beginDate, state.endDate],
    }
  );

  const { data: memberTrend, loading: memberTrendLoading } = useRequest(() =>
    analysisModel.queryUserTrend()
  );

  const daysInMonth = dayjs().daysInMonth();
  const thisMonthAvgUserCount = Math.round(
    memberTrend?.data?.thisMonthUserCount / daysInMonth
  );
  const todayRate = useMemo(() => {
    const rate = Number(
      Number(
        ((memberTrend?.data?.todayUserCount - thisMonthAvgUserCount) /
          thisMonthAvgUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [memberTrend?.data?.todayUserCount, thisMonthAvgUserCount]);

  const yesterdayRate = useMemo(() => {
    const rate = Number(
      Number(
        ((memberTrend?.data?.yesterdayUserCount - thisMonthAvgUserCount) /
          thisMonthAvgUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [memberTrend?.data?.yesterdayUserCount, thisMonthAvgUserCount]);

  const weekRate = useMemo(() => {
    const rate = Number(
      Number(
        ((memberTrend?.data?.thisWeekUserCount -
          memberTrend?.data?.lastWeekUserCount) /
          memberTrend?.data?.lastWeekUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [
    memberTrend?.data?.thisWeekUserCount,
    memberTrend?.data?.lastWeekUserCount,
  ]);

  const monthRate = useMemo(() => {
    const rate = Number(
      Number(
        ((memberTrend?.data?.thisMonthUserCount -
          memberTrend?.data?.lastMonthUserCount) /
          memberTrend?.data?.lastMonthUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [
    memberTrend?.data?.thisMonthUserCount,
    memberTrend?.data?.lastMonthUserCount,
  ]);

  const paidRate = useMemo(() => {
    const rate = Number(
      Number(
        (memberTrend?.data?.paidUserCount / memberTrend?.data?.totalUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [memberTrend?.data?.paidUserCount, memberTrend?.data?.totalUserCount]);

  const holdRate = useMemo(() => {
    const rate = Number(
      Number(
        (memberTrend?.data?.holdUserCount / memberTrend?.data?.totalUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [memberTrend?.data?.holdUserCount, memberTrend?.data?.totalUserCount]);

  const realNameRate = useMemo(() => {
    const rate = Number(
      Number(
        (memberTrend?.data?.realNameUserCount /
          memberTrend?.data?.totalUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [memberTrend?.data?.realNameUserCount, memberTrend?.data?.totalUserCount]);

  const minutesRate = useMemo(() => {
    const rate = Number(
      Number(
        (memberTrend?.data?.recent5MinutesUserCount /
          memberTrend?.data?.totalUserCount) *
          100
      ).toFixed(2)
    );
    return isNaN(rate) || !isFinite(rate) ? 0 : rate;
  }, [
    memberTrend?.data?.recent5MinutesUserCount,
    memberTrend?.data?.totalUserCount,
  ]);

  // const marketData =
  //   marketTrend?.data?.map((item: any) => ({
  //     date: dayjs(item.countDate).format("YYYY-MM-DD"),
  //     market: item.amount,
  //     type: 1,
  //   })) ?? [];

  const amountData = amountTrend
    ? amountTrend?.data?.map((item: any) => ({
        date: dayjs(item.countDate).format("YYYY-MM-DD"),
        amount: item.amount,
        type: 2,
      }))
    : [];

  const volumeData = volumeTrend
    ? volumeTrend?.data?.map((item: any) => ({
        date: dayjs(item.countDate).format("YYYY-MM-DD"),
        value: item.amount,
        type: 3,
      }))
    : [];

  const dualAxesConfig = {
    height: 300,
    data: [amountData, volumeData],
    xField: "date",
    yField: ["amount", "value"],
    meta: {
      // market: {
      //   alias: "市值",
      // },
      amount: {
        alias: "成交额",
        formatter: (v: number) => `¥ ${numeral(v).format("0,0")}`,
      },
      value: {
        alias: "成交量",
      },
    },
    geometryOptions: [
      {
        geometry: "line",
        color: "#5B8FF9",
        seriesField: "amount",
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
        smooth: true,
      },
      {
        geometry: "line",
        color: "#5AD8A6",
        seriesField: "value",
        lineStyle: {
          lineWidth: 3,
        },
        smooth: true,
      },
    ],
  };

  return (
    <Page className={styles.page}>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          state.responsive = offset.width < 596;
        }}
      >
        <Spin spinning={memberTrendLoading}>
          <ProCard
            title={`总用户数: ${memberTrend?.data?.totalUserCount ?? 0}`}
            extra={`${dayjs().format("YYYY年MM月DD日")}`}
            split={state.responsive ? "horizontal" : "vertical"}
            bordered
          >
            <ProCard split="horizontal">
              <ProCard split="horizontal">
                <ProCard split="vertical">
                  <StatisticCard
                    statistic={{
                      title: "今日新增用户",
                      value: memberTrend?.data?.todayUserCount ?? 0,
                      description: (
                        <Statistic
                          title="较本月平均用户增长"
                          value={`${todayRate}%`}
                          trend={
                            todayRate === 0
                              ? undefined
                              : todayRate > 0
                              ? "up"
                              : "down"
                          }
                        />
                      ),
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "昨日新增用户",
                      value: memberTrend?.data?.yesterdayUserCount ?? 0,
                      description: (
                        <Statistic
                          title="较本月平均用户增长"
                          value={`${yesterdayRate}%`}
                          trend={
                            yesterdayRate === 0
                              ? undefined
                              : yesterdayRate > 0
                              ? "up"
                              : "down"
                          }
                        />
                      ),
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "本周新增用户",
                      value: memberTrend?.data?.thisWeekUserCount ?? 0,
                      description: (
                        <Statistic
                          title="周环比"
                          value={`${weekRate}%`}
                          trend={
                            weekRate === 0
                              ? undefined
                              : weekRate > 0
                              ? "up"
                              : "down"
                          }
                        />
                      ),
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "本月新增用户",
                      value: memberTrend?.data?.thisMonthUserCount ?? 0,
                      description: (
                        <Statistic
                          title="月环比"
                          value={`${monthRate}%`}
                          trend={
                            monthRate === 0
                              ? undefined
                              : monthRate > 0
                              ? "up"
                              : "down"
                          }
                        />
                      ),
                    }}
                  />
                </ProCard>
                <ProCard split="vertical">
                  <StatisticCard
                    statistic={{
                      title: "近3天新增用户",
                      value: memberTrend?.data?.recent3DaysUserCount ?? 0,
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "近7天新增用户",
                      value: memberTrend?.data?.recent7DaysUserCount ?? 0,
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "上周新增用户",
                      value: memberTrend?.data?.lastWeekUserCount ?? 0,
                    }}
                  />
                  <StatisticCard
                    statistic={{
                      title: "上月新增用户",
                      value: memberTrend?.data?.lastMonthUserCount ?? 0,
                    }}
                  />
                </ProCard>
              </ProCard>
              <StatisticCard.Group
                direction={state.responsive ? "column" : "row"}
              >
                <StatisticCard
                  statistic={{
                    title: "活跃用户数",
                    value: memberTrend?.data?.recent5MinutesUserCount ?? 0,
                    description: (
                      <Statistic title="占比" value={`${minutesRate}%`} />
                    ),
                  }}
                  chart={
                    <RingProgress
                      width={80}
                      height={80}
                      percent={minutesRate / 100}
                      color={["#5B8FF9", "#E8EDF3"]}
                    />
                  }
                  chartPlacement="left"
                />
                <StatisticCard
                  statistic={{
                    title: "实名用户数",
                    value: memberTrend?.data?.realNameUserCount ?? 0,
                    description: (
                      <Statistic title="占比" value={`${realNameRate}%`} />
                    ),
                  }}
                  chart={
                    <RingProgress
                      width={80}
                      height={80}
                      percent={realNameRate / 100}
                      color={["#5B8FF9", "#E8EDF3"]}
                    />
                  }
                  chartPlacement="left"
                />
                <StatisticCard
                  statistic={{
                    title: "付费用户数",
                    value: memberTrend?.data?.paidUserCount ?? 0,
                    description: (
                      <Statistic title="占比" value={`${paidRate}%`} />
                    ),
                  }}
                  chart={
                    <RingProgress
                      width={80}
                      height={80}
                      percent={paidRate / 100}
                      color={["#ECC838", "#E8EDF3"]}
                    />
                  }
                  chartPlacement="left"
                />
                <StatisticCard
                  statistic={{
                    title: "持仓用户数",
                    value: memberTrend?.data?.holdUserCount ?? 0,
                    description: (
                      <Statistic title="占比" value={`${holdRate}%`} />
                    ),
                  }}
                  chart={
                    <RingProgress
                      width={80}
                      height={80}
                      percent={holdRate / 100}
                      color={["#53DB19", "#E8EDF3"]}
                    />
                  }
                  chartPlacement="left"
                />
              </StatisticCard.Group>
            </ProCard>
          </ProCard>
        </Spin>

        <ProCard
          title={
            <Segmented
              value={state.dateTimeRange}
              onChange={(value) => (state.dateTimeRange = value.toString())}
              options={[
                {
                  label: "近30天",
                  value: "recent30Days",
                },
                {
                  label: "近3个月",
                  value: "recent3Month",
                },
                {
                  label: "近半年",
                  value: "recent6Month",
                },
              ]}
            />
          }
        >
          <Spin spinning={amountTrendLoading || volumeTrendLoading}>
            <DualAxes {...dualAxesConfig} />
          </Spin>
        </ProCard>
      </RcResizeObserver>
    </Page>
  );
};
