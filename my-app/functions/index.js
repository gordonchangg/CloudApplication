const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

exports.setAdminClaims = onDocumentCreated('admin/{docId}', async (event) => {
    if (!event.data) {
        console.error("No data in event.");
        return;
    }
    const data = event.data.data();
    const email = data.email;

    const userId = event.params.docId;

    try {
        await getAuth().setCustomUserClaims(userId, { admin: true });
        console.log(`Admin role set for ${email}`);
        await event.data.ref.delete();
    } catch (error) {
        console.error('Error setting admin claims:', error);
    }
});
