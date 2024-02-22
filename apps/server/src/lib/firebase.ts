import * as admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

const app = admin.initializeApp({
	credential: admin.credential.cert('./serviceAccountKey.json'),
})

const auth = getAuth(app)

export { app, auth }
