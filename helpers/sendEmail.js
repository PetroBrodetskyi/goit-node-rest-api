import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "petro.brodetskyi@ukr.net" };
  await sgMail.send(email);
  return true;
}

export default sendEmail;
