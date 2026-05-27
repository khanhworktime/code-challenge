import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageContent } from "./layout/page-content";
import { Header } from "./layout/header";
import Grainient from "./components/Grainient";
import { ThemeProvider } from "next-themes";
import { motion } from "motion/react";

const queryClient = new QueryClient();
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <main className="relative w-full min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
          >
            <Header />
            <PageContent />
          </motion.div>
          {/* Background */}
          <div className="w-screen h-screen fixed -z-10 top-0 left-0">
            <Grainient
              color1="#271940"
              color2="#48397a"
              color3="#888744"
              timeSpeed={0.75}
              colorBalance={0.31}
              warpStrength={3.15}
              warpFrequency={5}
              warpSpeed={2}
              warpAmplitude={58}
              blendAngle={0}
              blendSoftness={0.1}
              rotationAmount={500}
              noiseScale={0.7}
              grainAmount={0.1}
              grainScale={2}
              contrast={1.5}
              gamma={0.9}
              saturation={0.95}
              centerX={0}
              centerY={0}
              zoom={0.8}
            />
            {/* Overlay */}
            <div className="bg-black/60 absolute inset-0" />
          </div>
        </main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
