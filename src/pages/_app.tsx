import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ItemsProvider } from "../../src/hooks/useItemsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ItemsProvider {...pageProps}>
      <Component {...pageProps} />
    </ItemsProvider>
  );
}
