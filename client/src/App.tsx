import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import Gallery from "@/pages/gallery";
import ItemDetail from "@/pages/item-detail";
import About from "@/pages/about";
import CuratorialStatement from "@/pages/curatorial-statement";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path="/" component={Gallery} />
        <Route path="/about" component={About} />
        <Route path="/curatorial-statement" component={CuratorialStatement} />
        <Route path="/item/:id" component={ItemDetail} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-16">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
