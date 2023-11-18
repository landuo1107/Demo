import { Tag } from "antd";

export enum CopyrightStatusEnum {
  INIT = 1,
  HOLD = 2,
  ON_SALE = 3,
  LOCKING = 4,
  DESTROYED = 5,
}

export const CopyrightStatusMaps = {
  [CopyrightStatusEnum.INIT]: <Tag color="volcano">初始化</Tag>,
  [CopyrightStatusEnum.HOLD]: <Tag color="green">持有</Tag>,
  [CopyrightStatusEnum.ON_SALE]: <Tag color="blue">寄售中</Tag>,
  [CopyrightStatusEnum.LOCKING]: <Tag color="orange">锁定中</Tag>,
  [CopyrightStatusEnum.DESTROYED]: <Tag color="cyan">已销毁</Tag>,
};

export enum CopyrightSaleStatusEnum {
  NORMAL = 0,
  LOCKED = 1,
}

export const CopyrightSaleStatusMaps = {
  [CopyrightSaleStatusEnum.NORMAL]: <Tag color="cyan">正常</Tag>,
  [CopyrightSaleStatusEnum.LOCKED]: <Tag color="orange">锁仓</Tag>,
};
