export interface Endpoint {
  path: string;
  method: "get" | "post" | "delete" | "patch";
  useToken: boolean;
  body?: Record<string, any>;
  expected: number;
  description: string;
  extendedTest?: (v: { data?: any; message: string }) => boolean;
  token?: string;
}
