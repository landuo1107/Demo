import { Tag } from "antd";
import { ReactNode } from "react";

export enum NoticeTypeEnum {
  ACTIVITY = 1,
  NEW = 2,
  SYNTHESIS = 3,
  OPERATE = 4,
  EMPOWERMENT = 5,
  AIRDROP = 6,
  CONSIGNMENT = 7,
  REFUTE = 8,
}

export const NoticeTypeEnumMaps: Record<string, ReactNode> = {
  [NoticeTypeEnum.ACTIVITY]: <Tag color="cyan">活动公告</Tag>,
  [NoticeTypeEnum.NEW]: <Tag color="volcano">上新公告</Tag>,
  [NoticeTypeEnum.SYNTHESIS]: <Tag color="magenta">合成公告</Tag>,
  [NoticeTypeEnum.OPERATE]: <Tag color="green">运营公告</Tag>,
  [NoticeTypeEnum.EMPOWERMENT]: <Tag color="orange">赋能公告</Tag>,
  [NoticeTypeEnum.AIRDROP]: <Tag color="purple">空投公告</Tag>,
  [NoticeTypeEnum.CONSIGNMENT]: <Tag color="red">寄售公告</Tag>,
  [NoticeTypeEnum.REFUTE]: <Tag color="lime">辟谣公告</Tag>,
};
