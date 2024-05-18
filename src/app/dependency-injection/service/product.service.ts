export class ProductService {
  getProducts() {
    return [
      { quantity: 1, item: 'Memory Card', price: 500 },
      { quantity: 1, item: 'Pen Drive', price: 750 },
      { quantity: 1, item: 'Power Bank', price: 1000 },
    ];
  }
}
