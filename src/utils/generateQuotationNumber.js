/**
 * @param {any} id
 */
async function generateQuotationNumber(id) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const lastTwoDigits = year.toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${day}${month}${lastTwoDigits}-${id}`;
}

module.exports = {
  generateQuotationNumber,
};
