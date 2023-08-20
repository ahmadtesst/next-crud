const Card = ({ title }: { title: string }) => {
  return (
    <div className="text-yellow-500 cursor-pointer transition w-[200px] h-[100px] border border-white flex justify-center items-center rounded hover:bg-yellow-500 hover:text-black">
      <h2>{title}</h2>
    </div>
  );
};

export default Card;
