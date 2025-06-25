export const generateNewsletterTemplate = ({
                                               message,
                                               unsubscribeLink,
                                               deleteLink,
                                           }: {
    message: string;
    unsubscribeLink: string;
    deleteLink: string;
}) => {
    // Conversion des sauts de ligne en <br/>
    const formattedMessage = message.replace(/\n/g, "<br/>");
    //le style inline est utilisé pour simplifier le rendu dans les emails
    // et éviter les problèmes de compatibilité avec certains clients de messagerie.
    return ` 
    <div style="font-family: sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
        <div style="background: #f3f3f3; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #604080;">Notre Newsletter</h1>
        </div>
        <div style="padding: 20px; color: #444; font-size: 16px;">
          ${formattedMessage}
        </div>
        <div style="background: #333; color: #ccc; padding: 20px; text-align: center; font-size: 14px;">
          <p style="margin: 0 0 8px;">Vous pouvez :</p>
          <a href="${unsubscribeLink}" style="color: #ddd; margin-right: 15px;">Se désinscrire</a>
          |
          <a href="${deleteLink}" style="color: #ddd; margin-left: 15px;">Supprimer mes données</a>
        </div>
      </div>
    </div>
  `;
};
