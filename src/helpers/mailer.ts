import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

// Database Connection
connectDB();

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // find a user based on token & update
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // create transporter
    let transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "37415083f0e142",
        pass: "6049d182e4cc06",
      },
    });

    // create mail options
    const mailOptions = {
      from: "roshan.shah@roshan.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Here </a> To ${
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
      }
      <br/>
      Or Copy and Paste the link below in your browser.
      <br />
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    // send mail
    const mailResponse = await transporter.sendMail(mailOptions);

    // return mail response
    return mailResponse;
  } catch (error: any) {
    throw new Error(error);
  }
};
