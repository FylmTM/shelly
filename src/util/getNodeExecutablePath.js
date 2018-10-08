module.exports = () => {
  if (process.platform === 'win32') {
    return `"${process.execPath}"`;
  }
  return process.execPath;
};
