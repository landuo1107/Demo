import { PageContainer, PageContainerProps } from "@ant-design/pro-layout";
import { PropsWithChildren } from "react";
import styles from "./index.module.less";

interface PageProps extends PropsWithChildren<PageContainerProps> {}

export default ({ children, className, ...props }: PageProps) => {
  return (
    <PageContainer
      className={`${styles.container} ${className ?? ""}`}
      {...props}
    >
      {children}
    </PageContainer>
  );
};
