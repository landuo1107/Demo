import { globalEvent } from "@/events/global.event";
import { PropsWithChildren, useEffect } from "react";
import { useStillness, useStillnessManager } from "react-stillness-component";

interface KeepAliveProps extends PropsWithChildren {
  path: string;
}

export default ({ path, children }: KeepAliveProps) => {
  const manager = useStillnessManager();

  const collected = useStillness({
    collect: (contract) => {
      return {
        isStillness: contract.isStillness(),
        stillnessId: contract.getStillnessId(),
      };
    },
  });

  useEffect(() => {
    const handler = ({ activeKey }: any) => {
      if (activeKey === path) {
        manager.getActions().triggerUnset({
          id: collected.stillnessId,
        });
      }
    };

    if (collected.stillnessId && path) {
      globalEvent.addListener("refresh", handler);
    }

    return () => {
      globalEvent.removeListener("refresh", handler);
    };
  }, [collected.stillnessId, path]);

  return <>{children}</>;
};
