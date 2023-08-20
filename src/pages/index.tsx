import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import ItemsList from "@/components/items-list";
import { apiHandler } from "@/api";
import { ItemsResponse } from "@/types";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-10 p-4 lg:p-24 ${inter.className}`}
    >
      <div>
        <h1 className="text-4xl font-bold text-center">
          ITEMS LIST
        </h1>
        <p>
          Your own curated list of <span className="italic text-yellow-500">items</span>
        </p>
      </div>
      <ItemsList />
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: itemsRes, error } = await apiHandler<ItemsResponse>({
    method: "GET",
    url: "/items",
  });
  
  if (error) {
    return {
      props: {
        error: { statusCode: 500 },
      },
    };
  }


  return {
    props: {
      items: itemsRes || [],
    },
  };
};
