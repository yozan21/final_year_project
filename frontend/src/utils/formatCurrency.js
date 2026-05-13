const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NP", { style: "currency", currency: "NPR" }).format(
    value
  );

export default formatCurrency;
