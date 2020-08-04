class Data {
  validateDataType(data, dataTypes) {
    return dataTypes.includes(typeof data) ? data : null;
  }
}

export default Data;
