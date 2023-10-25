class Egreso extends Dato {
  static contEgresos = 0;
  constructor(desc, val) {
    super(desc, val);
    this._id = ++Egreso.contEgresos;
  }
  get id() {
    return this._id;
  }
}
