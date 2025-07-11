export const getPaymentPlanBreakdown = (paymentPlan) => {
  const downPaymentInitial = 10;
  const totalPayment = Number(paymentPlan);

  const downPayment = downPaymentInitial;
  let onConstruction = totalPayment - downPaymentInitial;
  let onHandover = 100 - totalPayment;

  if (onConstruction < 0) {
    onConstruction = 0;
  }

  if (onHandover < 0) {
    onHandover = 0;
  }

  // Optional: if total payment is <= down payment, skip construction stage
  if (totalPayment <= downPaymentInitial) {
    onConstruction = 0;
    onHandover = 100 - downPaymentInitial;
  }

  return {
    downPayment,
    onConstruction,
    onHandover,
  };
};
