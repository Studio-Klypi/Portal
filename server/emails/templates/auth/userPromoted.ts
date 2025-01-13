import type { IEmailTemplate } from "~/types/generics/email";

export default (email: string): IEmailTemplate => ({
  to: email,
  subject: "Vous avez été promus !",
  text: `Les droits d'administration sur le portail vous ont été confiés ! Faites-en bon usage.`,
});
