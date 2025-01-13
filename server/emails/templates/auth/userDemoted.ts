import type { IEmailTemplate } from "~/types/generics/email";

export default (email: string): IEmailTemplate => ({
  to: email,
  subject: "Vous avez perdus vos droits !",
  text: `Les droits d'administration sur le portail vous ont été retirés ! Vous ne pouvez désormais plus effectuer d'action administrateur.`,
});
