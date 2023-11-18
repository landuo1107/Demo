import { Tag } from "antd";
import { ReactNode } from "react";

export enum ActivityTypeEnum {
  SYNTHESIS = 1,
  EXCHANGE = 2,
  COLORFUL = 3,
  LOTTERY = 4,
  SALE = 5,
  BOOK = 9,
  SIGN_IN = 10,
}

export const ActivityTypeEnumMaps: Record<string, ReactNode> = {
  [ActivityTypeEnum.SYNTHESIS]: <Tag color="cyan">合成</Tag>,
  [ActivityTypeEnum.EXCHANGE]: <Tag color="volcano">兑换</Tag>,
  [ActivityTypeEnum.COLORFUL]: <Tag color="magenta">缤纷</Tag>,
  [ActivityTypeEnum.LOTTERY]: <Tag color="blue">抽奖</Tag>,
  [ActivityTypeEnum.SALE]: <Tag color="orange">发售</Tag>,
  [ActivityTypeEnum.BOOK]: <Tag color="gold">预约</Tag>,
  [ActivityTypeEnum.SIGN_IN]: <Tag color="green">签到</Tag>,
};
