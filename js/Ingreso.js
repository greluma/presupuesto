class Ingreso extends Dato {
  static contIngresos = 0;
  constructor(desc, val) {
    super(desc, val);
    this._id = ++Ingreso.contIngresos;
  }
  get id() {
    return this._id;
  }
}
