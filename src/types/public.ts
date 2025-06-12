export interface ApiResponse<T> {
  data: T;
  msg: string;
  status: number;
}

export interface ProgramInfo {
  author: string;
  commit_sha: string;
  name: string;
  version: string;
}

export interface Config {
  account_choose: string;
  audio: string;
  css: string;
  doc: string;
  favicon_url: string;
  footer: string;
  head: string;
  image: string;
  js: string;
  path_prefix: string;
  readme: string;
  s_column: string;
  s_order: string;
  short_action: string;
  site_name: string;
  theme: string;
  video: string;
  code?: string;
}

export interface FileItem {
  file_name: string;
  file_size: number;
  size_fmt: string;
  file_type: string;
  is_folder: boolean;
  last_op_time: string;
  path: string;
  thumbnail: string;
  view_type: string;
  download_url?: string;
}

export interface ListResponse {
  is_folder: boolean;
  last_file: string;
  next_file: string;
  no_referrer: boolean;
  page_no: number;
  page_size: number;
  pages: number;
  total_count: number;
  content: FileItem[];
}

export interface Account {
  mode: string;
  name: string;
  path: string;
}
