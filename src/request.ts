import axios from "axios";
import { environmentVariables } from "./config";

const { apiUrl, email, password } = environmentVariables;

/**
 * @param {path} path to check
 * @param {method} method for endpoint
 * @param {useToken} useToken to use token or not
 * @param {body} body to send
 * @param {contentType} contentType to use
 */
export class EndpointRequest {
  private token: string = "";

  createToken = async () => {
    const { accessToken } = await this.request<{
      accessToken: string;
    }>("/auth/login", "post", false, {
      password,
      email,
    });

    return accessToken || "";
  };

  request = async <T>(
    path = "",
    method: "get" | "post" | "delete" | "patch" = "get",
    useToken = false,
    body = {},
    contentType = "application/json"
  ): Promise<{
    status: number;
    data?: T;
    message: string;
    accessToken?: string;
  }> => {
    try {
      let request: Record<string, any>;
      const url = `${apiUrl}${path}`;

      if (useToken && !this.token) {
        this.token = await this.createToken();
        if (!this.token) {
          throw new Error("invalid login credentials");
        }
      }
      const headers = {
        ...(useToken ? { Authorization: this.token } : {}),
        "Content-Type": contentType,
      };

      if (["delete", "get"].includes(method)) {
        request = await axios[method as "get" | "delete"](url, {
          headers,
        });
      } else {
        request = await axios[method as "post" | "patch"](url, body, {
          headers,
        });
      }

      if (request.status === 204) {
        const { status } = request;
        return { status, message: "" };
      }
      const {
        data: { data, message, accessToken },
        status,
      } = request;
      return { data, status, message, accessToken };
    } catch (err) {
      const error = err as unknown as any;
      if (error.response?.status && error.response?.data) {
        const {
          data: { data, message },
          status,
        } = error.response;

        return {
          message,
          data,
          status,
        };
      }
      throw new Error(error.message);
    }
  };
}
