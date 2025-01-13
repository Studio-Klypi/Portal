export interface IEmailAttachment {
  filename: string;
  contentType: string;
  path: string;
}
export interface IEmailTemplate {
  to?: string;
  subject?: string;
  html?: string;
  text: string;
  attachments?: IEmailAttachment[];
}
export interface IEmailOptions {
  to?: string;
  subject?: string;
  attachments?: IEmailAttachment[];
}
