module.exports = {
  validate: function(format) {
    if (format.upperbound <= format.lowerbound) {
      return "Upperbound 不可小於 lowerbound";
    }
    return null;
  }
}