import { useItemsContext } from "@/hooks/useItemsContext";
import Card from "../card";
import Modal from "../modal";
import { useEffect, useState } from "react";
import { Item, ItemsResponse } from "@/types";
import { apiHandler } from "@/api";

const ItemsList = () => {
  const { items, setItems } = useItemsContext();
  const [modalActive, setModalActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setModalActive(true);
    setSelectedItem(item);
  };

  const handleNewItem = () => {
    setModalActive(true);
    setSelectedItem(null);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModalActive(false);
      }
    });

    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);

  const refreshItems = async () => {
    const { data, error } = await apiHandler<ItemsResponse>({
      method: "GET",
      url: `/api/items`,
    });
    if (data) {
      setItems(data);
    }
  };


  const handleItemDelete = async (item: Item) => {
    const { data, error } = await apiHandler<ItemsResponse>({
      method: "DELETE",
      url: '/api/items',
      data: { id: item._id },
    });
    if (data) {
      refreshItems();
    }
  };


  return (
    <>
      <section className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {items?.map((item) => (
          <div key={item._id}>
            <Card
              handleDelete={() => {
                handleItemDelete(item);
              }}
              handleEdit={() => {
                handleItemClick(item);
              }}
              title={item.title}
              createdAt={item.createdAt}
            />
          </div>
        ))}
      </section>

      {modalActive && (
        <Modal
          closeModal={() => {
            setModalActive(false);
          }}
          selectedItem={selectedItem}
          refreshItems={refreshItems}
        />
      )}

      <div>
        <button
          onClick={handleNewItem}
          className="bg-yellow-500 text-black py-2 w-[200px] rounded hover:bg-yellow-600"
        >
          Create An Item
        </button>
      </div>
    </>
  );
};

export default ItemsList;
