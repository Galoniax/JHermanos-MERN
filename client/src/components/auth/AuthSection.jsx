export default function AuthSection({ children }) {
  return (
    /** Fondo texturizado */
    <div className="min-h-[calc(100vh-73px)] w-full bg-[var(--alabastro)] flex items-center justify-center p-4 py-8 relative">
      <div className="absolute inset-0 bg-[var(--alabastro)] bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] bg-center opacity-30 pointer-events-none" />

      {children}
    </div>
  );
}
