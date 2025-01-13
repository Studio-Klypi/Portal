import type { IEmailTemplate } from "~/types/generics/email";

export default (email: string, password: string): IEmailTemplate => ({
  to: email,
  subject: "Votre compte a été créé !",
  text: `Votre compte a été créé ! Utiliser votre identifiant (${email}) pour vous connecter avec le mot de passe : ${password} .`,
});
