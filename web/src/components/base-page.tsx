import { ReactNode } from "react";
import { Header } from "./header";

interface BasePageProps {
  children : ReactNode
}

export function BasePage({ children }:BasePageProps) {
  return (
    <main className="min-h-screen min-w-screen">
      <Header />
      { children }
    </main>
  )
}