import { useMailer } from "#mailer";
import type { IEmailOptions, IEmailTemplate } from "~/types/generics/email";

const transporter = (host: string, port: number, user: string, pass: string) => {
  return useMailer().customTransporter({
    auth: {
      user,
      pass,
    },
    host,
    port,
    secure: true,
  });
};

export async function send(template: IEmailTemplate, options?: IEmailOptions) {
  const { mailerHost, mailerPort, mailerUser, mailerPass, mailerFromName, mailerFromAddress } = useRuntimeConfig();

  return useMailer().sendMail({
    requestId: "rqId",
    transporter: transporter(mailerHost, Number(mailerPort as string), mailerUser, mailerPass),
    options: {
      fromName: mailerFromName,
      fromEmail: mailerFromAddress,
      to: options?.to ?? template.to ?? mailerFromAddress,
      subject: options?.subject ?? template.subject ?? "",
      text: template.text,
      html: template.html ?? "",
      attachments: options?.attachments ?? template.attachments ?? [],
    },
  });
}
