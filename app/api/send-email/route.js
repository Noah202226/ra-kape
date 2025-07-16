import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message, orders, totalAmount, reference } =
    await req.json();

  try {
    // create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send mail
    await transporter.sendMail({
      from: `"RA Kape" <${process.env.EMAIL_USER}>`,
      to: ["noaligpitan@gmail.com", "aidellourizguevarra@gmail.com"],
      subject: "New Order from Website",
      html: `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
      <div style="background:#d97706; color:white; padding:20px; text-align:center;">
        <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/images/files/rakape-logo/view?project=686e20fe00214a6c2fac&mode=admin" alt="RA Kape" style="height:50px; margin-bottom:10px;" />
        <h2 style="margin:0;">New Order Notification</h2>
      </div>
      <div style="padding:20px; color:#333;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Gcash Refernce:</strong>${reference}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Orders:</strong> 
        ${orders.map((order) => `<p>${order.name} -- P:${order.price}`)}

        --------------------------------------------------------------------------
        <br />
        TOTAL AMOUNT: ${orders.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        )}
      
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
        <p style="font-size:14px; color:#777;">This is an automated email from your website order system.</p>
      </div>
    </div>
  `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
