import { SwapForm } from "../components/swap-form";

export function PageContent() {
  return (
    <div className="container w-md mx-auto py-24 space-y-8">
      {/* Title */}
      <h1 className="font-display !text-white text-center text-5xl">
        Fancy Swap
      </h1>

      {/* Form */}
      <SwapForm />

      {/* Form Captions */}
    </div>
  );
}
