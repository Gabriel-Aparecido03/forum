import { QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/user-context";
import { Routers } from "./routers";
import { queryClient } from "./lib/tanstack";

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <main className="font-sans text-zinc-200 font-medium">
      <BrowserRouter>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <Routers />
          </QueryClientProvider>
        </UserContextProvider>
      </BrowserRouter>
    </main>
  )
}

