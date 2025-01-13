import type { IEmailTemplate } from "~/types/generics/email";

export default (email: string): IEmailTemplate => ({
  to: email,
  subject: "Votre compte a été supprimé !",
  text: `Le compte correspondant à votre adresse e-mail (${email}) a été définitivement supprimé !`,
});
