import { PanIndexClient } from "../client";
import {
  ApiResponse,
  ProgramInfo,
  Config,
  ListResponse,
  Account,
  FileItem,
} from "../types/public";

export class PublicAPI {
  constructor(private client: PanIndexClient) {}
  /**
   * `/api/v3/public/info`
   * 获取 PanIndex API 程序信息。
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_1-%e8%8e%b7%e5%8f%96api%e7%a8%8b%e5%ba%8f%e4%bf%a1%e6%81%af)
   *
   * @returns Promise<AxiosResponse<ApiResponse<ProgramInfo>
   *
   * @example
   * const info = await api.getProgramInfo();
   * console.log(info.data);
   */
  getProgramInfo() {
    return this.client
      .getClient()
      .get<ApiResponse<ProgramInfo>>("/api/v3/public/info");
  }

  /**
   * `/api/v3/public/config.json`
   * 获取 PanIndex 配置信息
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_2-%e8%8e%b7%e5%8f%96%e9%85%8d%e7%bd%ae%e4%bf%a1%e6%81%af)
   *
   * @returns Promise<ApiResponse<Config>, any>>
   *
   * @example
   * const info = await api.getConfig();
   * console.log(info.data);
   */
  getConfig() {
    return this.client
      .getClient()
      .get<ApiResponse<Config>>("/api/v3/public/config.json");
  }

  /**
   * `/api/v3/public/index`
   * 获取目录、文件列表
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_3-%e8%8e%b7%e5%8f%96%e7%9b%ae%e5%bd%95%e3%80%81%e6%96%87%e4%bb%b6%e5%88%97%e8%a1%a8)
   *
   * @returns Promise<ApiResponse<ListResponse>, any>>
   *
   * @example
   * ```ts
   * const info = await api.getConfig({
   *   path: "/folder/path",
   *   sort_by: "name",
   *   order: "asc",
   *   page_no: 1,
   *   page_size: 20,
   * });
   * ```
   */
  listDirectory(data: {
    path: string;
    sort_by?: string;
    order?: string;
    page_no?: number;
    page_size?: number;
  }) {
    const form = new FormData();
    Object.entries(data).forEach(
      ([k, v]) => v !== undefined && form.append(k, String(v))
    );
    return this.client
      .getClient()
      .post<ApiResponse<ListResponse>>("/api/v3/public/index", form);
  }

  /**
   * `/api/v3/public/raw/{path}`
   * 获取文件内容
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_4-获取文件内容)
   *
   * @returns Promise<AxiosResponse<any, any>>
   *
   * @example
   * const info = await api.getFileContent("/s3/代码/code_golang.go");
   * console.log(info.data);
   */
  getFileContent(path: string) {
    return this.client
      .getClient()
      .get(`/api/v3/public/raw/${encodeURIComponent(path)}`);
  }

  /**
   * `/api/v3/public/raw/{path}`
   * 获取网盘列表
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_5-%e8%8e%b7%e5%8f%96%e7%bd%91%e7%9b%98%e5%88%97%e8%a1%a8)
   *
   * @returns Promise<ApiResponse<Account[]>, any>>
   *
   * @example
   * const info = await api.getAccountList();
   * console.log(info.data);
   */
  getAccountList() {
    return this.client
      .getClient()
      .get<ApiResponse<Account[]>>("/api/v3/public/account/list");
  }

  /**
   * `/api/v3/public/shortInfo`
   * 短链 & 二维码
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_6-%e7%9f%ad%e9%93%be-amp-%e4%ba%8c%e7%bb%b4%e7%a0%81)
   *
   * @returns Promise<AxiosResponse<any, any>>
   *
   * @example
   * ```ts
   * const info = await api.createShortLink({
   *   prefix: "https://localhost:5238/s/",
   *   path: "/api/v3/public/shortInfo",
   *   isFile: true,
   * });
   * ```
   */
  createShortLink(data: { prefix: string; path: string; isFile: boolean }) {
    const form = new FormData();
    Object.entries(data).forEach(([k, v]) => form.append(k, String(v)));
    return this.client.getClient().post("/api/v3/public/shortInfo", form);
  }

  /**
   * `/api/v3/public/search`
   * 搜索
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_5-%e8%8e%b7%e5%8f%96%e7%bd%91%e7%9b%98%e5%88%97%e8%a1%a8)
   *
   * @returns Promise<ApiResponse<Account[]>, any>>
   *
   * @example
   * const info = await api.search("fileName");
   * console.log(info.data);
   */
  search(key: string) {
    const form = new FormData();
    form.append("key", key);
    return this.client
      .getClient()
      .post<ApiResponse<ListResponse>>("/api/v3/public/search", form);
  }

  /**
   * `/api/v3/public/short`
   * 短链跳转
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_8-%e7%9f%ad%e9%93%be%e8%b7%b3%e8%bd%ac)
   *
   * @returns Promise<AxiosResponse<any, any>>
   *
   * @example
   * const info = await api.search("short_code");
   * console.log(info.data);
   */
  resolveShortCode(short_code: string) {
    const form = new FormData();
    form.append("short_code", short_code);
    return this.client.getClient().post("/api/v3/public/short", form);
  }

  /**
   * `/api/v3/public/files`
   * 文件过滤
   * [Panindex api doc](https://docs.noki.icu/#/docs/zh/api?id=_9-%e6%96%87%e4%bb%b6%e8%bf%87%e6%bb%a4)
   *
   * @returns Promise<AxiosResponse<ApiResponse<FileItem[]>, any>>
   *
   * @example
   * ```ts
   * const info = await api.createShortLink({
   *   path: "/path/",
   *   viewType: "audio",
   * });
   * ```
   */
  filterFiles(data: {
    path: string;
    viewType: string;
    sortColumn?: string;
    sortOrder?: string;
  }) {
    const form = new FormData();
    Object.entries(data).forEach(
      ([k, v]) => v !== undefined && form.append(k, String(v))
    );
    return this.client
      .getClient()
      .post<ApiResponse<FileItem[]>>("/api/v3/public/files", form);
  }
}
