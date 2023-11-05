export class ServerExceptionError extends Error {
  constructor(message = 'Server Down, Please try again later!') {
    super(message);
    this.name = 'ServerDowntime';
  }
}
