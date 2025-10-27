export function createWelcomeEmailTemplate(name, clientURL) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Messenger</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
    <div style="background: linear-gradient(to right, #00a86b, #013220); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480" alt="Messenger Logo" style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">Welcome to InTouch!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <p style="font-size: 18px; color: #00a86b;"><strong>Hello ${name},</strong></p>
      <p><b>Welcome to InTouch — because staying connected should feel effortless.</b><br>
Chat, share, laugh, and stay close — no matter the distance, <b>InTouch</b> keeps your conversations alive and personal.</p>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #00a86b;">
        <p style="font-size: 16px; margin: 0 0 15px 0;"><strong>🚀 Get started in minutes:</strong></p>
        <ul style="padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 10px;">Add a profile photo that shows your vibe</li>
          <li style="margin-bottom: 10px;">Sync contacts and spot familiar faces instantly</li>
          <li style="margin-bottom: 10px;">Say your first “Hey!” — someone’s waiting to reply</li>
          <li style="margin-bottom: 0;">Try sharing a photo, voice note, or fun emoji</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href=${clientURL} style="background: linear-gradient(to right, #00a86b, #013220); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 500; display: inline-block;">Let’s Stay InTouch</a>
      </div>
      
      <p style="margin-bottom: 5px;">We’re always happy to hear what’s on your mind.
Every bit of feedback helps shape something better for everyone.</p>
      
      <p style="margin-top: 25px; margin-bottom: 0;">Stay connected,
<br>Team InTouch</p>
    </div>
   
  </body>
  </html>
  `;
}
