import { apiHandler } from "@/api";
import { Item } from "@/types";
import { useEffect, useRef, useState } from "react";

const Modal = ({
  selectedItem,
  closeModal,
  refreshItems,
}: {
  selectedItem: Item | null;
  closeModal: () => void;
  refreshItems: () => void;
}) => {
  const [titleState, setTitle] = useState(selectedItem?.title ?? "");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedItem) {
        await apiHandler({
          method: "PUT",
          url: `/api/items`,
          data: {
            title: titleState,
            id: selectedItem._id,
          },
        });
      } else {
        await apiHandler({
          method: "POST",
          url: `/api/items`,
          data: {
            title: titleState,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      closeModal();
      refreshItems();
    }
  };

  return (
    <div className="bg-[rgb(0,0,0,.9)] inset-0 absolute flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="title" className=" mb-2 text-yellow-500">
            Title
          </label>
          <input
            ref={inputRef}
            name="title"
            className="bg-transparent outline-none border border-white text-white p-2 rounded focus:border-yellow-500"
            value={titleState}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <button
            type="button"
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600"
          >
            {loading ? "Loading..." : selectedItem ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
