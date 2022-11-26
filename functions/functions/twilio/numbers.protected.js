/**
 * See available phone numbers
 * @param {Twilio} client
 * @param {string} country 
 * @param {string} type 
 * @param {string} areaCode 
 * @param {number} limit 
 * @returns 
 */
const listAvailableNumbers = async (client, country = 'US', type = 'local', areaCode = '', limit = 20) => {
  switch (type) {
    case 'local':
      return await client.availablePhoneNumbers(country)
        .local.list({
          areaCode,
          limit,
        })
        .then(data => {
          data.forEach(l => console.log('Local number ', l));
          return data;
        })
        .catch(err => {
          console.log(`Error fetching local numbers: ${err}`);
          return err;
        });
    case 'mobile':
      return await client.availablePhoneNumbers(country)
        .mobile
        .list({ limit })
        .then(data => {
          data.forEach(m => console.log('Mobile number ', m));
          return data;
        })
        .catch(err => {
          console.log(`Error fetching mobile numbers: ${err}`);
          return err;
        });
    case 'tollFree':
      return await client.availablePhoneNumbers(country)
        .tollFree
        .list({ limit })
        .then(data => {
          data.forEach(t => console.log('Toll free number ', t));
          return data;
        })
        .catch(err => {
          console.log(`Error fetching toll free numbers: ${err}`);
          return err;
        });
    default:
      return;
  }
}

/**
 * TODO: Purchase phone number
 * @param {Twilio} client 
 */
const purchasePhoneNumber = (client) => {}

/**
 * Get all numbers for an account by account SID
 * @param {Twilio} client
 * @param {number} limit 
 * @returns 
 */
const listAccountNumbers = async (client, limit = 20) => {
  return await client.incomingPhoneNumbers
    .list({ limit })
    .then(data => data)
    .catch(err => {
      console.log(`Error fetching account numbers: ${err}`);
      return err;
    });
}

module.exports = {
    listAvailableNumbers,
    purchasePhoneNumber,
    listAccountNumbers,
}

