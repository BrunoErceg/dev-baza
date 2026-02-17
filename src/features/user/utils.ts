export function getEmailTemplate({
  name,
  fromEmail,
  message,
}: {
  name: string;
  fromEmail: string;
  message: string;
}) {
  return ` <div style="background-color: #f9f9f9; padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e1e1e1;">
            
            <div style="background-color: #0070f3; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Nova poruka s DevBaza.hr</h1>
            </div>

            <div style="padding: 30px;">
            <p style="margin-top: 0;">Dobili ste novu poruku putem kontakt forme sa DevBaza.hr:</p>
            
            <div style="background-color: #f0f4f8; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Pošiljatelj:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${fromEmail}" style="color: #0070f3; text-decoration: none;">${fromEmail}</a></p>
            </div>

            <p style="font-weight: bold; margin-bottom: 10px;">Poruka:</p>
            <div style="font-style: italic; color: #555; line-height: 1.6; border-left: 4px solid #0070f3; padding-left: 15px;">
                ${message}
            </div>
            </div>

            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0 0 10px 0;">
                <strong>Napomena:</strong> Ovo je automatska obavijest. Ne odgovarajte na ovaj mail.
            </p>
            <p style="margin: 0;">
                Za odgovor pošiljatelju kliknite ovdje: 
                <a href="mailto:${fromEmail}" style="color: #0070f3; font-weight: bold;">${fromEmail}</a>
            </p>
            </div> 
        </div>
    </div>
      `;
}
