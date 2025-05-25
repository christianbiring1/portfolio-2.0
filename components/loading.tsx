export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex space-x-2">
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
