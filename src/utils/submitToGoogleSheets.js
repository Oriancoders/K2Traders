// Replace this URL with your Google Apps Script Web App URL after deployment
const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbwGaMDHhSn12CxZeBu_UXthOU_Vt8QpWSGS3oo2wpVp3O2Fc3vPJd9pL4iQtrIqJqsx/exec';

export async function submitToGoogleSheets(billData) {
  // Prepare the data for Google Sheets
  const formattedData = {
    billId: billData.billId,
    timestamp: billData.timestamp || new Date().toISOString(),
    shipping: {
      name: billData.shipping?.name || '',
      email: billData.shipping?.email || '',
      phone: billData.shipping?.phone || '',
      address: billData.shipping?.address || '',
    },
    items: Array.isArray(billData.items) ? billData.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total
    })) : [],
    subtotal: billData.subtotal || 0,
  };

  try {
    // Use no-cors + text/plain to avoid preflight; response will be opaque
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(formattedData),
    });

    // Can't read response in no-cors mode; assume success if no network error
    console.log('Order bill sent to Google Sheets.');
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
}