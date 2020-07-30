class Data {
  validateDataType(data, dataType) {
    if (dataType === 'number') {
      return typeof data === dataType && data >= 0 ? data : null;
    } else {
      return typeof data === dataType ? data : null;
    }
  }
}

export default Data;
