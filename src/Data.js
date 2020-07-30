class Data {
  validateDataType(data, dataType) {
    return typeof data === dataType ? data : null;
  }
}

export default Data;
