import "reflect-metadata";
import { Product } from "./product.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

const products = [
  { title: "A Carpet", price: 29.9 },
  { title: "A Book", price: 10.99 }
];

/*const p1 = new Product("A Book", 12.99);
console.log(p1.getInformation());*/

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price);
// });

const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

const newProd = new Product("", -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});
console.log(newProd.getInformation());
