//ce fichier est le cœur du système d’authentification NextAuth :
// toutes les actions auth (login, logout, callback, session…) passeront par ce fichier.
// Il est important de le nommer `[...nextauth]` car NextAuth utilise cette convention
//  pour reconnaître les routes d'authentification.
// il va contenir la config  avec Credentials Provider.

import NextAuth from "next-auth"
import {auth} from "@/auth";

const handler = NextAuth(auth)

export {handler as GET, handler as POST}
