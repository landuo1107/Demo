import { proxy } from "valtio";
import { subscribeKey } from "valtio/utils";

export interface NavbarItem {
  itemPath: string;
  name: string;
  closable?: boolean;
}

export const defaultItem: NavbarItem = {
  itemPath: "/",
  name: "总览",
  closable: false,
};

const state = proxy({
  activeKey: defaultItem.itemPath,
  items: [defaultItem],
});

const actions = {
  init: (callback?: (activeKey: string) => void) => {
    state.activeKey =
      localStorage.getItem("navbar-active-key") ?? defaultItem.itemPath;
    let items = localStorage.getItem("navbar-items");
    if (items) {
      state.items = JSON.parse(items);
    } else {
      state.items = [defaultItem];
    }
    callback && callback(state.activeKey);
  },
  push: (item: NavbarItem, callback?: (activeKey: string) => void) => {
    if (state.items.findIndex((o) => o.itemPath === item.itemPath) < 0) {
      state.items = [...state.items, item];
    }
    state.activeKey = item.itemPath;
    callback && callback(item.itemPath);
  },
  remove: (activeKey: string, callback?: (nextKey?: string) => void) => {
    let idx = state.items.findIndex((item) => item.itemPath === activeKey);
    let nextKey;
    if (state.activeKey === activeKey) {
      if (idx >= state.items.length) {
        nextKey = state.items[state.items.length - 1].itemPath;
      } else {
        nextKey = state.items[idx - 1].itemPath;
      }
      if (nextKey) {
        state.activeKey = nextKey;
      }
    }
    state.items = [...state.items.filter((o) => o.itemPath !== activeKey)];
    callback && callback(nextKey);
  },
  switchTo: (activeKey: string, callback?: (activeKey: string) => void) => {
    state.activeKey = activeKey;
    callback && callback(activeKey);
  },
  closeLeft: (
    currentKey: string,
    callback?: (activeKey: string, others: NavbarItem[]) => void
  ) => {
    const idx = state.items.findIndex((item) => item.itemPath === currentKey);
    const others = state.items.filter(
      (o, index) =>
        ![defaultItem.itemPath, currentKey].includes(o.itemPath) && index < idx
    );
    state.items = [
      ...state.items.filter((o) => {
        return others.findIndex((item) => item.itemPath === o.itemPath) < 0;
      }),
    ];
    callback && callback(currentKey, others);
  },
  closeRight: (
    currentKey: string,
    callback?: (activeKey: string, others: NavbarItem[]) => void
  ) => {
    const idx = state.items.findIndex((item) => item.itemPath === currentKey);
    const others = state.items.filter(
      (o, index) =>
        ![defaultItem.itemPath, currentKey].includes(o.itemPath) && index > idx
    );
    state.items = [
      ...state.items.filter((o) => {
        return others.findIndex((item) => item.itemPath === o.itemPath) < 0;
      }),
    ];
    callback && callback(currentKey, others);
  },
  closeOthers: (
    currentKey: string,
    callback?: (activeKey: string, others: NavbarItem[]) => void
  ) => {
    const others = state.items.filter((o) => o.itemPath !== currentKey);
    if (currentKey === defaultItem.itemPath) {
      state.items = [defaultItem];
    } else {
      state.items = [
        defaultItem,
        ...state.items.filter((o) => o.itemPath === currentKey),
      ];
    }
    state.activeKey = currentKey;
    callback && callback(currentKey, others);
  },
  clear: (callback?: (activeKey: string) => void) => {
    state.items = [defaultItem];
    state.activeKey = defaultItem.itemPath;
    callback && callback(defaultItem.itemPath);
  },
};

subscribeKey(state, "activeKey", () => {
  localStorage.setItem("navbar-active-key", state.activeKey);
});

subscribeKey(state, "items", () => {
  localStorage.setItem("navbar-items", JSON.stringify(state.items));
});

export default {
  state,
  ...actions,
};
