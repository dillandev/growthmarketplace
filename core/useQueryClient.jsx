import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";

const FIVE_MINUTES = 1000 * 60 * 5;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MINUTES,
      gcTime: TWENTY_FOUR_HOURS,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

const canUseStorage =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

if (canUseStorage) {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "react-query-cache",
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: TWENTY_FOUR_HOURS,
  });
}