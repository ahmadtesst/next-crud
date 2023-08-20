import { TrashCan } from "../icons/delete";
import { Edit } from "../icons/edit";

const Card = ({
  title,
  createdAt,
  handleEdit,
  handleDelete,
}: {
  title: string;
  createdAt: string;
  handleEdit: () => void;
  handleDelete: () => void;
}) => {
  const btnClass =
    "rounded-full border border-white transition text-black p-4 hover:bg-yellow-900 hover:text-black hover:border-yellow-500";

  const randomDate = () => {
    const start = new Date();
    const end = new Date();
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toLocaleDateString();
  };

  return (
    <div
      className="
       text-yellow-500 transition w-[200px] h-[200px] border border-white flex justify-center
       items-center flex-col gap-5 rounded hover:border-yellow-500
      "
    >
      <h2>{title}</h2>
      <div className="flex gap-5">
        <button onClick={handleDelete} className={btnClass}>
          <TrashCan className="text-red-500" />
        </button>
        <button onClick={handleEdit} className={btnClass}>
          <Edit className="text-yellow-500" />
        </button>
      </div>
      <div className="text-sm mt-5 text-slate-500">
        {new Date(createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Card;
