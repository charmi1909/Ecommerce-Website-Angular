export class CartItem {
    constructor(
      public _id: string,
      public productName: string,
      public price: number,
      public quantity: number,
      image: string,
    ) {}
  
    getTotalPrice(): number {
      return this.price * this.quantity;
    }
  }