import { resendClient, sender } from "../lib/resend.js";
import {createWelcomeEmailTemplate} from "./emailTemplate.js"

export const sendWelcomeEmail = async(email,name,clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Glad to have you on board',
        html: createWelcomeEmailTemplate(name,clientURL),
  });

    if (error) {
    console.error("Error Sending Welcome Email", error);
    throw new Error("Failed to Send Welcome Email");
  }

}
