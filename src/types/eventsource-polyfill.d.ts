declare module 'eventsource-polyfill' {
  export interface EventSourcePolyfillOptions {
    headers?: Record<string, string>;
    withCredentials?: boolean;
    heartbeatTimeout?: number;
  }

  class EventSourcePolyfill extends EventSource {
    constructor(url: string, options?: EventSourcePolyfillOptions);
    close(): void;
  }

  export default EventSourcePolyfill;
}
