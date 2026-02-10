// src/types/federation.d.ts
declare module 'ComputerControlMicroApp/ComputerControlMicroApp' {
  const Component: React.ComponentType<any>;
  export default Component;
}

// ...existing code...
declare module "MovieApp/remote-app" {
  export function mount(container: HTMLElement, props?: Record<string, any>): void;
  export function unmount(): void;
}
// ...existing code...