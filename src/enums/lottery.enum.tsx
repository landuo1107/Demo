import { Tag } from "antd";
import { ReactNode } from "react";

export enum LotteryTypeEnum {
  SLOT = 1,
  WHEEL = 2,
  GRID = 3,
}

export const LotteryTypeEnumMaps: Record<string, ReactNode> = {
  [LotteryTypeEnum.SLOT]: <Tag color="cyan">老虎机</Tag>,
  [LotteryTypeEnum.WHEEL]: <Tag color="blue">大转盘</Tag>,
  [LotteryTypeEnum.GRID]: <Tag color="pink">九宫格</Tag>,
};
