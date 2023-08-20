import { ReactElement, ReactNode, useContext, createContext, useState, SetStateAction } from "react";
import type { Item } from "@/types";

type ItemsContextProps = {
  items?: Item[];
  setItems: React.Dispatch<SetStateAction<Item[]>>;
};

const ItemsContext = createContext<ItemsContextProps>({
  items: [],
  setItems: () => {},
});

export const ItemsProvider = (
  props: ItemsContextProps & { children: ReactNode }
): ReactElement => {
  const { items: initialItems } = props;

  const [items, setItems] = useState<Item[]>(initialItems ?? []);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => useContext(ItemsContext);
