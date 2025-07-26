import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, address, message, orders, totalAmount, reference } =
    await req.json();

  console.log("Received order data:", {
    name,
    reference,
  });
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
      to: ["noaligpitan@gmail.com", "chitomiryenda24@gmail.com"],
      // to: ["noaligpitan@gmail.com"],
      subject: "New Order from RaKape Website",
      html: `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #000; border-radius:8px; overflow:hidden;">
      <div style="background:#000; color:white; padding:20px; text-align:center;">
        <img src="https://fra.cloud.appwrite.io/v1/storage/buckets/images/files/6878e343001179ccc468/view?project=686e20fe00214a6c2fac&mode=admin" alt="RA Kape" style="height:50px; margin-bottom:10px;" />
        <h2 style="margin:0;">New Order Notification</h2>
      </div>

      
      <div style="padding:20px; color:#333;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Gcash Refernce:</strong></p>
         <img src=${reference} alt="Gcash receipt" style="height:800px; height:500px; margin-bottom:10px; text-align:center; align-self:center;" />
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Orders:</strong> 
        ${orders.map(
          (order) =>
            `<p>${order.productName} -- (${order.quantity} x P:${order.price})`
        )}
        <br />
        --------------------------------------------------------------------------
        <br />
        <strong> TOTAL AMOUNT: ${orders.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        )}</strong>
      
        <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">
        <p style="font-size:14px; color:#777;">Thanks for ordering in RAKAPE</p>
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
