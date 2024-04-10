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



// const email = {
//   to: "tagay43453@rartg.com",
//   from: "petro.brodetskyi@ukr.net",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from localhost: 3000</p>"
// }

// sgMail.send(email)
//   .then(() => console.log("Email send success"))
//   .catch (error => console.log(error.message));