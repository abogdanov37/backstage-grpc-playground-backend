export interface Config {
  grpcPlayground?: {
    document?: {
      /**
       * @visibility frontend
       */
      enabled?: boolean;

      /**
       * Command to run protoc
       */
      protoc?: {
        command?: string;
      }

      /**
       * Install protoc-gen-doc from github
       */
      protocGenDoc?: {
        install?: boolean;
        version?: string;
      };
      /**
       * Use cache for generated document or not
       */
      useCache?: {
        enabled: boolean;
        ttlInMinutes: number;
      };
    };
    
    certStore?: {
      /**
       * @visibility frontend
       */
      enabled?: boolean;
      provider?: string;
      secretKey?: string;
      initVector?: string;
    }
  };
}