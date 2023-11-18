import { Tag } from "antd";
import { ReactNode } from "react";

export enum CollectionTypeEnum {
  COPYRIGHT = 1,
  BLIND_BOX = 2,
  GOODS = 3,
}

export const CollectionTypEnumMaps: Record<string, ReactNode> = {
  [CollectionTypeEnum.COPYRIGHT]: <Tag color="cyan">版权</Tag>,
  [CollectionTypeEnum.BLIND_BOX]: <Tag color="volcano">盲盒</Tag>,
  [CollectionTypeEnum.GOODS]: <Tag color="magenta">实体</Tag>,
};
